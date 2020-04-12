import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import EventPage from "../container/user/EventPage";
import Landing from "../container/user/LandingPage";
import Register from "../container/user/Registeration";
import "./App.css";

// Test 
import PortalPage from '../container/portal/LogInPage'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Test */}
          <Route
            exact
            path="/portal"
            component={PortalPage}
          />

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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
