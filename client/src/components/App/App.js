import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage';
import Landing from '../container/user/LandingPage';
import Register from '../container/user/Registeration'
import UsersPage from '../container/admin/UsersPage'
import Dashboard from "../container/admin/controlPage/MainPage"
import AdminLogin from '../container/admin/LogInPage'

import PortalPage from '../container/portal/LogInPage'
import "antd/dist/antd.css";
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
           <Route exact path="/portal" component={PortalPage} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
        
          <Route exact path="/dashboard/:eventcode/users" component={UsersPage}/>
          <Route exact path='/admin' component={AdminLogin}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
