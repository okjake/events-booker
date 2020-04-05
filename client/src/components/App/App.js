import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import Footer from '../common/Footer'


import './App.css';

function App() {
  return (
    <div className="App">
      <Footer />
      <button>See More</button>

      <Router>
      <Switch>

      </Switch>
      </Router>
    </div>
  );
}

export default App;