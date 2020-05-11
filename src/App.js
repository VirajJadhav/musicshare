import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserProfile from "./components/UserProfile"
import NavBar from "./components/DesignComponents/NavBar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"
import './App.css';

function App() {
  return (
    <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={UserProfile} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
