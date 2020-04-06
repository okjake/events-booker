import React from "react";
import axios from "axios";
// import { Button } from "antd";
// import "antd/dist/antd.css";

// import EventPage from '../EventPage/index'
import { Link } from 'react-router-dom'
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
        console.log(res.data)
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

  render() {
    const { title, events } = this.state;
    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.title}
              {event.date}
              {event.category}
              <Link to={{
                pathname: `/events/${event.category}/${event.event_code}`,    
                state: [{ 
                  title: event.title,
                  details: event.details,
                  image: event.image,
                  date: event.date,
                  count: event.count,
                  duration: event.duration
                 }]
              }} >Event</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Landing;
