import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { Button, Result, Spin, Empty, Form, InputNumber, message } from 'antd';

import './style.css';
import Header from './Header/Header';
import CardContent from './CardContent';
import EventsGrid from '../../../common/EventsGrid';

class Attendance extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/v1/event/date');
      if (data.length) {
        this.setState({
          isLoaded: true,
          events: data,
        });
      } else {
        this.setState({
          isLoaded: true,
        });
      }
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  render() {
    const { error, isLoaded, events } = this.state;
    return (
      <div className="wrapper">
        <Header />
        <div>
          {error ? (
            <Result
              status="500"
              title="500"
              subTitle="Something went Wrong, please try again later"
            />
          ) : !isLoaded ? (
            <Spin size="large" />
          ) : !events.length ? (
            <Empty description={<span>no events for today</span>} />
          ) : (
            <main>
              <EventsGrid events={events} CardContent={CardContent} />
              {/* <ul className="main__grid">
                {events.map(
                  ({ id, image, title, category, event_code, date }, i) => (
                    <li className="card grid_item" key={id}>
                      {console.log(refs[i])}
                      <img className="card__image" src={image} alt={title} />
                      <CardContent
                        title={title}
                        category={category}
                        event_code={event_code}
                        date={date}
                        ref={refs[i]}
                      />
                    </li>
                  )
                )}
              </ul> */}
            </main>
          )}
        </div>
      </div>
    );
  }
}
propTypes.shape({
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
});
export default Attendance;
