import React, { Component } from 'react';
import { Button, Result } from 'antd';
import axios from 'axios';
import reactRouterPropTypes from 'react-router-prop-types';

import EventPageContent from '../EventPageContent';
import PopupBtnEvent from '../PopupBtnEvent';
import './style.css';

class EventPage extends Component {
  state = {
    image: '',
    title: '',
    otherEventProps: null,
    error: '',
    loading: true,
  };

  componentDidMount() {
    const {
      match: {
        params: { eventCode },
      },
    } = this.props;
    const {
      location: { state },
    } = this.props;
    if (state) {
      const {
        info: { image, ...otherEventProps },
      } = state;
      const {
        info: { title },
      } = state;
      this.setState({ image, title, otherEventProps, loading: false });
    } else {
      axios
        .get(`/api/v1/events/${eventCode}`)
        .then(({ data }) => {
          const { image, ...otherEventProps } = data;
          const { title } = data;
          this.setState({ image, title, otherEventProps, loading: false });
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
    }
  }

  render() {
    const {
      history: { goBack, push },
    } = this.props;
    const {
      match: {
        params: { eventCode, eventProg },
      },
    } = this.props;
    const { image, title, otherEventProps, error, loading } = this.state;
    return (
      <div>
        {error ? (
          <Result
            status="500"
            title="500"
            subTitle="Something went Wrong, please try again later"
          />
        ) : loading ? (
          <div>Loading</div>
        ) : (
          <div className="container">
            <img src={image} alt="event page background" className="image" />
            <div className="contant">
              <EventPageContent
                title={title}
                details={otherEventProps.details}
                date={otherEventProps.date}
                count={otherEventProps.count}
              />
              <div className="btns">
                <PopupBtnEvent
                  title={`Register at ${title} event`}
                  eventCode={eventCode}
                  eventProg={eventProg}
                  push={push}
                  purpose="Book Now"
                  type="booking"
                />

                <PopupBtnEvent
                  title={`Cancel Registration at ${title} event`}
                  eventCode={eventCode}
                  eventProg={eventProg}
                  purpose="Cancel Registration"
                  type="cancel"
                />

                <Button type="primary" shape="round" autoFocus onClick={goBack}>
                  {' '}
                  Back{' '}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

EventPage.propTypes = {
  history: reactRouterPropTypes.history.isRequired,
  location: reactRouterPropTypes.location.isRequired,
  match: reactRouterPropTypes.match.isRequired,
};

export default EventPage;
