import React from 'react';
import Card from '../Card';
import './style.css';

const EventsGrid = ({ events, CardContent }) => (
  <ul className="main__grid">
    {events.map((event) => (
      <Card key={event.id} title={event.title} image={event.image}>
        <CardContent info={event} />
      </Card>
    ))}
  </ul>
);

export default EventsGrid;
