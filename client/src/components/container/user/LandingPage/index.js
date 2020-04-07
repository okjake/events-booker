import React from "react";
import axios from "axios";
import { Button, Result, Spin, Empty } from "antd";
import "antd/dist/antd.css";

import Card from "../../../common/Card";
import { Link } from "react-router-dom";
import "./style.css";

const EventBtn = ({ pathname, event }) => {
  return (
    <Link
      to={{
        pathname,
        state: { event },
      }}
      className="ant-btn ant-btn-round ant-btn-override"
    >
      Take A Part
    </Link>
  );
};

class Landing extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    title: "Upcoming",
    allEvents: [],
    filteredEvents: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/event")
      .then(({ data }) => {
        const response = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        this.setState({
          isLoaded: true,
          allEvents: response,
          filteredEvents: response,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  filterByCategory = (cat) => {
    const allEvents = JSON.parse(JSON.stringify(this.state.allEvents))
    if (cat === "Upcoming")
      return this.setState({ filteredEvents: allEvents, title: cat });
    const events = allEvents.filter((event) => event.category === cat);
    this.setState({ filteredEvents: events, title: cat });
  };

  render() {
    const { error, isLoaded, title, filteredEvents } = this.state;
    const { filterByCategory } = this;
    const categories = [
      "Code Academy",
      "Freelance",
      "Startups",
      "Public",
      "Upcoming",
    ];
    return (
      <div>
        <div className="catagories">
          {categories.map((cat) => (
            <Button
              shape="round"
              key={cat}
              autoFocus
              className="catagories__btn"
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div>
          {error ? (
            <Result
              status="500"
              title="500"
              subTitle="Something went Wrong, please try again later"
            />
          ) : !isLoaded ? (
            <Spin size="large" />
          ) : !filteredEvents.length && title === "Upcoming" ? (
            <Empty
              description={<span>no upcoming events at the meantime</span>}
            />
          ) : !filteredEvents.length ? (
            <Empty
              description={<span>no events for {title} at the meantime</span>}
            />
          ) : (
            <section className="main">
              <h2 className="main__title">{title}</h2>
              <ul className="main__grid">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="grid__item"
                    info={event}
                    element={
                      <EventBtn
                        pathname={`/events/${event.category}/${event.event_code}`}
                        event={event}
                      />
                    }
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default Landing;
