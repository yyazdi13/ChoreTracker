import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
// components
import Register from "./components/register";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: ""
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/dashboard/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && <p>Hello {this.state.username}!</p>}
        {/* Routes to different components */}
        <BrowserRouter>
          <Route exact path={"/"} component={Home} />
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route path="/Dashboard" render={() => <Dashboard />} />
          <Route path="/Register" render={() => <Register />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
