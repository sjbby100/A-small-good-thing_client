import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { bugAdded } from "./modules/bugs";
import store from "./store";
export default class App extends Component {
  render() {
    store.dispatch(bugAdded("에어팟", 222000, "사고싶다"));
    return (
      <div>
        <Switch></Switch>
      </div>
    );
  }
}
