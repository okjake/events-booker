import React from 'react';
import axios from 'axios';
import { Result, Spin, Empty } from 'antd';

import Header from '../../../common/Header';
import Categories from './Categories';
import EventsGrid from '../../../common/EventsGrid';
import CardContent from './CardContent';
import './style.css';

class Landing extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    title: 'Upcoming',
    allEvents: [],
    filteredEvents: [],
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/v1/event');
      const events = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      this.setState({
        isLoaded: true,
        allEvents: events,
        filteredEvents: events,
      });
    } catch (err) {
      let error;
      if (err.response) {
        error = err.response.data.msg || 'Sorry, something went wrong.';
      } else {
        error = 'Sorry, something went wrong.';
      }
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  setAllEvents = (cat) =>
    this.setState((state) => ({
      filteredEvents: state.allEvents,
      title: cat,
    }));

  setFilteredEvents = (cat) =>
    this.setState((state) => {
      const events = state.allEvents.filter((event) => event.category === cat);
      return { filteredEvents: events, title: cat };
    });

  render() {
    const { error, isLoaded, title, filteredEvents } = this.state;
    const { setAllEvents, setFilteredEvents } = this;
    return (
      <div className="wrapper">
        <header>
          <Header />
          <Categories
            setAllEvents={setAllEvents}
            setFilteredEvents={setFilteredEvents}
          />
        </header>
        <div>
          {error ? (
            <Result
              status="500"
              subTitle={error}
              style={{ padding: '48px 0' }}
            />
          ) : !isLoaded ? (
            <Spin
              size="large"
              style={{ display: 'block', margin: '50px auto 50px auto' }}
            />
          ) : !filteredEvents.length ? (
            title === 'Upcoming' ? (
              <Empty
                description={<span>no upcoming events at the meantime</span>}
                style={{ margin: '50px 0' }}
              />
            ) : (
              <Empty
                description={<span>no events for {title} at the meantime</span>}
                style={{ margin: '50px 0' }}
              />
            )
          ) : (
            <main>
              <h2 className="category-title">{title} events</h2>
              <EventsGrid events={filteredEvents} CardContent={CardContent} />
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default Landing;
