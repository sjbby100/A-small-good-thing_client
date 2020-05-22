import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Error from "./pages/error";
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Main} />
          <Route path="/error" component={Error} />
          <Redirect path="/" to="/login" />
        </Switch>
      </div>
    );
  }
}
