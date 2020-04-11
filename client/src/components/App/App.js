import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventPage from '../container/user/EventPage/index';
import Landing from "../container/user/LandingPage";
import Register from '../container/user/Registeration'
import AdminLogin from '../container/admin/LogInPage'

import "antd/dist/antd.css";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/events/:eventProg/:eventCode' component={EventPage} />
          <Route exact path="/register/:eventProg/:eventCode/:mobile" 
          component={Register}>
            <Route exact path='/login' component={AdminLogin}/>
      </Route>
        </Switch>
        <AdminLogin />
      </Router>
    </div>
  );
}

export default App;
