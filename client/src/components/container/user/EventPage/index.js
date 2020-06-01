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

  async componentDidMount() {
    try {
      const {
        match: {
          params: { eventCode },
        },
        location: { state },
      } = this.props;

      if (state) {
        const {
          info: { image, title, ...otherEventProps },
        } = state;
        this.setState({ image, title, otherEventProps, loading: false });
      } else {
        const { data } = await axios.get(`/api/v1/events/${eventCode}`);
        const { title, image, ...otherEventProps } = data;
        this.setState({ image, title, otherEventProps, loading: false });
      }
    } catch (err) {
      let error;

      if (err.response) {
        error = err.response.data.msg;
      } else {
        error = 'Something went wrong, please try again later';
      }
      this.setState({ error, loading: false });
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
