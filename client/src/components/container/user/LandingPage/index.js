import React from "react";
import axios from "axios";
import { Button, Result, Spin } from "antd";
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
      className="ant-btn ant-btn-round link"
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
    data: [],
    events: [],
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
          data: response,
          events: data,
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
    const { isLoaded, error, data } = this.state;
    if (!isLoaded || error) return;
    if (cat === "Upcoming") return this.setState({ events: data, title: cat });
    const events = data.filter((event) => event.category === cat);
    this.setState({ events, title: cat });
  };

  render() {
    const { error, isLoaded, title, events } = this.state;
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
          ) : (
            <section className="main">
              <h2 className="main__title">{title}</h2>
              <ul className="main__grid">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="grid__item"
                    info={event}
                    element={
                      <EventBtn
                        pathname={`/${event.category}/${event.event_code}`}
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
