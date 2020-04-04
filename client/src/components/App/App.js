import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from '../container/user/Registeration'

function App() {
  return (
    <div className="App">
      <h1>Events Booker</h1>
     <BrowserRouter>
     <div>
         <ul>
           <li>
             <Link to="/register">register</Link>
           </li>
        </ul>
        <Switch>
        <Route  path="/register">
        <Register mobileNo='123456789'></Register>
        </Route>
        </Switch>
        </div>
      </BrowserRouter>
     </div>
  );
}

export default App;
