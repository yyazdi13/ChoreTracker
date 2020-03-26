import React, { Component } from "react";
import Login from "./login";
import Register from "./register";

class Home extends Component {
  render() {
    return (
      <div>
        <Login />
        <Register />
      </div>
    );
  }
}

export default Home;
