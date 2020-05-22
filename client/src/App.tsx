import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { bugAdded } from "./modules/bugs";
import store from "./store";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";
export default class App extends Component {
  render() {
    store.dispatch(bugAdded("에어팟", 222000, "사고싶다"));
    return (
      <div>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}
