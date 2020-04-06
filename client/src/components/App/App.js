import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Footer from '../common/Footer'
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
      <Footer />

    </div>
  );
}

export default App;