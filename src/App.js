import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserProfile from "./components/UserProfile"
import NavBar from "./components/DesignComponents/NavBar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import FriendFeed from "./components/FriendFeed"
import FindFriend from "./components/FindFriend"
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import DeleteProfile from "./components/DeleteProfile"
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
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/friendfeed" component={FriendFeed} />
            <Route exact path="/findfriend" component={FindFriend} />
            <Route exact path="/deleteProfile" component={DeleteProfile} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
