import React from 'react';
import { BrowserRouter as Router,Route, Switch,Link } from 'react-router-dom';
import './App.css';

import Register from '../container/user/Registeration'
function App() {
  return (
    <div className="App">
      <Router>
      <Link to="/register/:eventProg/:eventCode/:mobileNo">register</Link>
      <Switch>
      <Route path="/register/:eventProg/:eventCode/:mobileNo" 
      component={Register}>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;