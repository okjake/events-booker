import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage/index'
import LandingPage from '../container/user/LandingPage/index'

import './App.css';

const App = () => {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;