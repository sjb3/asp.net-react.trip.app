import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import Trips from "./components/Trip/Trips";
import CreateTrip from "./components/Trip/CreateTrip";
import UpdateTrip from "./components/Trip/UpdateTrip";

import "./custom.css";
import DeleteTrip from "./components/Trip/DeleteTrip";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={CreateTrip} />
        <Route path="/trips" component={Trips} />
        <Route path="/update/:id" component={UpdateTrip} />
        <Route path="/delete/:id" component={DeleteTrip} />
      </Layout>
    );
  }
}
