import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import EventPage from "../container/user/EventPage";
import Landing from "../container/user/LandingPage";
import Register from "../container/user/Registeration";
import Attendance from "../container/portal/Attendance";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/events/:eventProg/:eventCode"
            component={EventPage}
          />
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/register/:eventProg/:eventCode/:mobile"
            component={Register}
          />
          <Route exact path="/portal/attendance" component={Attendance} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
