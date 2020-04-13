<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage/index';
import Landing from "../container/user/LandingPage";
import Register from '../container/user/Registeration'
import AdminLogin from '../container/admin/LogInPage'
||||||| merged common ancestors
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage/index';
import Landing from "../container/user/LandingPage";
import Register from '../container/user/Registeration'

=======
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
>>>>>>> 730399c57d09eb4fa87883a9c873ff143e5774d5
import "antd/dist/antd.css";

import EventPage from "../container/user/EventPage";
import Landing from "../container/user/LandingPage";
import Register from "../container/user/Registeration";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
<<<<<<< HEAD
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
          <Route exact path='/' component={Landing} />
          <Route exact path="/register/:eventProg/:eventCode/:mobile" 
          component={Register} />
            <Route exact path='/admin' component={AdminLogin}/>
||||||| merged common ancestors
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register/:eventProg/:eventCode/:mobile" 
          component={Register}>
      </Route>
=======
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
>>>>>>> 730399c57d09eb4fa87883a9c873ff143e5774d5
        </Switch>
      </Router>
    </div>
  );
};

export default App;
