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
      .then((res) => {
        const data = res.data.sort((a, b) => new Date(a) - new Date(b));
        this.setState({
          isLoaded: true,
          data,
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
    if (isLoaded && !error) {
      const events = data.filter((event) => event.category === cat);
      console.log(events);
      this.setState({ events, title: cat });
    }
  };

  handleUpcoming = () => {
    const { isLoaded, error, data } = this.state;
    if (isLoaded && !error) {
      this.setState({ events: data, title: "Upcoming" });
    }
  };

  render() {
    const { error, isLoaded, title, events } = this.state;
    const { filterByCategory, handleUpcoming } = this;
    return (
      <div>
        <div>
          <Button
            shape="round"
            onClick={() => filterByCategory("Code Academy")}
          >
            Code Academy
          </Button>
          <Button shape="round" onClick={() => filterByCategory("Freelance")}>
            Freelance
          </Button>
          <Button shape="round" onClick={() => filterByCategory("Startups")}>
            Startups
          </Button>
          <Button shape="round" onClick={() => filterByCategory("Public")}>
            Public
          </Button>
          <Button shape="round" onClick={handleUpcoming} autoFocus>
            Upcoming
          </Button>
        </div>
        <div>
          {error ? (
            <div>Error: {error.response.data.msg}</div>
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
