import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "antd/dist/antd.css";

import Landing from "../container/user/LandingPage";
import "./App.css";

import Register from '../container/user/Registeration'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
