import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "../container/user/LandingPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
