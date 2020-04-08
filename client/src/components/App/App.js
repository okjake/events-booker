import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage/index';
import Landing from "../container/user/LandingPage";
import Register from '../container/user/Registeration'

import "antd/dist/antd.css";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
          <Route exact path="/" component={Landing} />
          <Route path="/register/:eventProg/:eventCode/:mobile" 
          component={Register}>
      </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
