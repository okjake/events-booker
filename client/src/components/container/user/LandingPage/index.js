import React from "react";
import axios from "axios";

class Landing extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/event")
      .then((res) => {
        this.setState({
          isLoaded: true,
          events: res.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error : error.response.data.msg
        });
      });
  }

  render() {
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      );
    }
  }
}

export default Landing;
