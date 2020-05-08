import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserProfile from "./components/UserProfile"
import NavBar from "./components/NavBar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <div>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={UserProfile} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
