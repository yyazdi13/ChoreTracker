import React, { Component } from "react";
import axios from "axios";
import "../App.css";

axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: null,
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

      return (window.location = "/chorepage");
    });
  }
  render() {
    return (
      <div>
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
            fontFamily: "sans-serif"
          }}
        >
          Chore Tracker Login/Registration
        </header>
        <br></br>
        <h3
          style={{
            display: "flex",
            marginLeft: "30px",
            fontSize: "20px",
            fontFamily: "sans-serif"
          }}
        >
          Login
        </h3>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
          {this.state.valerrors && this.state.username && (
            <p>{this.state.valerrors.username.msg}</p>
          )}
          <input
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            onChange={this.changeHandler}
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />{" "}
          <br />
          {this.state.valerrors && this.state.password && (
            <p style={{ color: "red" }}>{this.state.valerrors.password.msg}</p>
          )}
          <input
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            onChange={this.changeHandler}
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />{" "}
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              marginLeft: "30px",
              height: "33px"
            }}
          >
            Submit
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default Login;
