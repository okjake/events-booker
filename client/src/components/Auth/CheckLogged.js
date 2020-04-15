import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function CheckLogged(ComponentToCheck, admin) {
  return class extends React.Component {
    state = {
      loading: true,
      redirect: false,
    };

    componentDidMount() {
      axios(`/checkToken/${admin}`)
        .then(() => this.setState({ loading: false, redirect: true }))
        .catch(() => this.setState({ loading: false }));
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        const url =
          admin === "admin" ? "/admin/dashboard" : "/portal/attendance";
        return <Redirect to={`${url}`} />;
      }
      return <ComponentToCheck {...this.props} />;
    }
  };
}

export default CheckLogged;
