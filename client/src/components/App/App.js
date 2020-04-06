import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Button } from 'antd';

import './App.css';
import Card from '../common/Card'

function App() {
  return (
    <div className="App">
      <button>See More</button>

      <Router>
      <Switch>

      </Switch>
      </Router>
    </div>
  );
}

export default App;