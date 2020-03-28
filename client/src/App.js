import React, { Component } from "react";
import Home from "./components/home";
//import Nav from "./components/Nav";
//import ChoreCard from "./components/ChoreCard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import ReactDOM from "react-dom";
import "./index.css";
//import APP from "./App.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
