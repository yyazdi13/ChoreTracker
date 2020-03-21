import React, { Component } from "react";
import Register from "./register";

class Home extends Component {
  // constructor() {
  // super();
  // }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Please register</p>
        <Register />
      </div>
    );
  }
}

export default Home;
