import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import Footer from '../common/Footer'


import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
      <Switch>

      </Switch>
      </Router>
      <button>See More</button>
      <Footer />
    </div>
  );
}

export default App;