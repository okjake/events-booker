import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import EventPage from '../container/user/EventPage';
import Landing from '../container/user/LandingPage';
import Register from '../container/user/Registeration'
import UsersPage from '../container/admin/UsersPage'

import "antd/dist/antd.css";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Link to="/dashboard/:eventcode/users">users</Link>
        <Switch>
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register/:eventProg/:eventCode/:mobile" 
          component={Register}/>
          <Route exact path="/dashboard/:eventcode/users" component={UsersPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
