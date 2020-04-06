import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Header from '../common/Header'


import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
      <Switch>

      </Switch>
      </Router>
      <Header />
   
    </div>
  );
}

export default App;