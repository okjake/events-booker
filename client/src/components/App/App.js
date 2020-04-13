import React from 'react';
import { BrowserRouter as Router, Route, Switch ,Link} from 'react-router-dom';
import Landing from "../container/user/LandingPage";
import Dashboard from "../container/admin/controlPage/MainPage"
import Register from '../container/user/Registeration'
import EventPage from "../container/user/EventPage";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Link to="/admin/dashboard">dashbard</Link> */}
        <Switch>
          <Route
            exact
            path="/events/:eventProg/:eventCode"
            component={EventPage}
          />
          <Route exact path="/" component={Landing} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/register/:eventProg/:eventCode/:mobile" 
          component={Register}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
