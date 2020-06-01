import React, { Component } from 'react';
import { Button, Result } from 'antd';

import Axios from 'axios';
import EventPageContent from '../EventPageContent/EventPageContent';
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp';

import './style.css';

class EventPage extends Component {
  state = {
    image: '',
    title: '',
    otherEventProps: null,
    error: '',
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
      this.setState({ image, title, otherEventProps });
    } else {
      Axios.get(`/api/v1/event/${eventCode}`)
        .then(({ data }) => {
          const { image, ...otherEventProps } = data;
          const { title } = data;
          this.setState({ image, title, otherEventProps });
        })
        .catch((error) => {
          this.setState({ error });
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
    const { image, title, otherEventProps, error } = this.state;
    return (
      <div className="container">
        {error && (
          <Result
            status="500"
            title="500"
            subTitle="Something went Wrong, please try again later"
          />
        )}
        <img src={image} alt="event page background" className="image" />
        <div className="contant">
          <EventPageContent {...otherEventProps} />
          <div className="btns">
            <PopupBtnEventcomp
              title={`Register at ${title} event`}
              eventCode={eventCode}
              eventProg={eventProg}
              push={push}
              purpose="Book Now"
              type="booking"
            />

            <PopupBtnEventcomp
              title={`Cancel Registeration at ${title} event`}
              eventCode={eventCode}
              eventProg={eventProg}
              purpose="Cancel Registeration"
              type="cancel"
            />

            <Button type="primary" shape="round" autoFocus onClick={goBack}>
              {' '}
              Back{' '}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default EventPage;
