import React, { Component } from "react";
import axios from "axios";
//import { cookie } from "express-validator";
//import { response } from "express";
axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
      valerrors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitHandler(event) {
    event.preventDefault();

    axios.post("/api/login", this.state).then(result => {
      if (result.data.error) {
        return this.setState({ error: result.data.message });
      }
      if (result.data.error) {
        return this.setState({ valerrors: result.data.errors });
      }

      return (window.location = "/mainpage");
    });
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
          {this.state.valerrors && this.state.username && (
            <p>{this.state.valerrors.username.msg}</p>
          )}
          <input
            onChange={this.changeHandler}
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />{" "}
          <br />
          {this.state.valerrors && this.state.password && (
            <p>{this.state.valerrors.password.msg}</p>
          )}
          <input
            onChange={this.changeHandler}
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />{" "}
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />

        <br />
      </div>
    );
  }
}

export default Login;
