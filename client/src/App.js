import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ChoreCard from "./components/ChoreCard";
import AddChore from "./pages/addchore";
import "./index.css";
import Home from "./components/home";
import Reward from "./components/Rewards/AddReward";
import Cart from "./components/Rewards/cart";
import Kids from "./components/kids";
import Earnings from "./pages/Earnings";
import Chore from "./components/ChoreCard/ChoreCard";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />

        <Switch>
          <div className="backdrop">
          <Route exact path="/" component={Home} />
        
          <Route exact path="/earnings" component={Earnings}/>
          <Route exact path="/chorepage" component={Chore} />
          <Route exact path="/addchore" component={AddChore} />
          <Route exact path="/kids" component={Kids} />
          <Route exact path="/reward" component={Reward}>
            <Cart />
          </Route>
          <Route exact path={"/"}></Route>
          </div>
        </Switch>
        <div className="bg"></div>
      </Router>
    );
  }
}

export default App;
