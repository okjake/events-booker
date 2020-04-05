import React from "react";
import axios from "axios";
import { Button } from "antd";
import "antd/dist/antd.css";

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
      .then(({data}) => {
        const response = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        this.setState({
          isLoaded: true,
          data : response,
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
        <div>
          {categories.map((cat) => (
            <Button
              shape="round"
              key={cat}
              autoFocus
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div>
          {error ? (
            <div>Error: Something went Wrong, please try again later</div>
          ) : !isLoaded ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h2>{title}</h2>
              <ul>
                {events.map((event) => (
                  <li key={event.id}>
                    {event.title}
                    {event.date}
                    {event.category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Landing;
