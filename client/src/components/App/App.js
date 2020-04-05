import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Button } from 'antd';

import './App.css';
import Card from '../common/Card'

function App() {
  return (
    <div className="App">
      <h1>Events Booker</h1>
      <Card />
      <button>See More</button>

      <Router>
      <Switch>

      </Switch>
      </Router>
    </div>
  );
}

export default App;