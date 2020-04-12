import React from "react";
import axios from "axios";
import { Button, Result, Spin, Empty } from "antd";

import Card from "../../../common/Card";
import Header from "../../../common/Header";
import "./style.css";

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
    const { allEvents } = this.state;
    if (cat === "Upcoming")
      this.setState(({ allEvents }) => {
        return { filteredEvents: allEvents };
      });
    else {
      const events = allEvents.filter((event) => event.category === cat);
      this.setState({ filteredEvents: events, title: cat });
    }
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
      <div className="wrapper">
        <header>
          <Header />
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
        </header>
        <div>
          {error ? (
            <Result
              status="500"
              title="500"
              subTitle="Something went Wrong, please try again later"
            />
          ) : !isLoaded ? (
            <Spin size="large" />
          ) : !filteredEvents.length ? (
            title === "Upcoming" ? (
              <Empty
                description={<span>no upcoming events at the meantime</span>}
              />
            ) : (
              <Empty
                description={<span>no events for {title} at the meantime</span>}
              />
            )
          ) : (
            <main>
              <ul className="main__grid">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="grid__item" info={event} />
                ))}
              </ul>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default Landing;
