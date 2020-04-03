import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav"
import ChoreCard from "./components/ChoreCard"
import "./index.css";
import Home from "./components/home";
import AddReward from './components/Rewards/AddReward';
import Cart from "./components/Rewards/cart";

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path={"/reward"}>
            <Nav/>
            <Cart/>
        </Route>
        
        <Route exact path={"/"}>
          <div className="bg">
          <Nav />
          <Home/>
          </div>
        </Route>
      </Switch>
      </Router>
  )};
}

export default App;
