import React, { Component } from "react";
import Navbar from "./components/Nav/index";
import ChoreCard from "./components/ChoreCard/index";
import Home from "./components/home";
import AddChore from "./pages/addchore";

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
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chorepage" component={ChoreCard} />
          <Route exact path="/addchore" component={AddChore} />
        </Switch>
      </Router>
    );
  }
}

export default App;
