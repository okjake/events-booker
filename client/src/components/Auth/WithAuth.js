import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function WithAuth(ComponentToProtect, admin) {
  return class extends React.Component {
    state = {
      loading: true,
      redirect: false,
    };

    componentDidMount() {
      axios(`/checkToken/${admin}`)
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false, redirect: true }));
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to={`/${admin}`} />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}

export default WithAuth;
