import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import Landing from "../container/user/LandingPage";
import EventPage from "../container/user/EventPage";
import Register from "../container/user/Registeration";
import AdminLogin from "../container/admin/LogInPage";
import PortalPage from "../container/portal/LogInPage";
import Dashboard from "../container/admin/controlPage/MainPage";
import UsersPage from "../container/admin/UsersPage";
import Attendance from "../container/portal/Attendance";
import WithAuth from "../Auth/WithAuth";
import CheckLogged from "../Auth/CheckLogged";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/events/:eventProg/:eventCode"
            component={EventPage}
          />
          <Route
            exact
            path="/register/:eventProg/:eventCode/:mobile"
            component={Register}
          />

          <Route
            exact
            path="/admin"
            component={CheckLogged(AdminLogin, "admin")}
          />
          <Route
            exact
            path="/portal"
            component={CheckLogged(PortalPage, "portal")}
          />

          <Route
            exact
            path="/admin/dashboard"
            component={WithAuth(Dashboard, "admin")}
          />
          <Route
            exact
            path="/dashboard/:eventcode/users"
            component={WithAuth(UsersPage, "admin")}
          />
          <Route
            exact
            path="/portal/attendance"
            component={WithAuth(Attendance, "portal")}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
