import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      role: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    alert("A new user was submitted: " + this.state.username);
    console.log("register handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //New Line of Code
    const { username, password, role } = this.state;
    const user = { username, password, role };
    this.props.isloading();
    this.props.register(user);

    //request to server to add a new username/password
    axios
      .post("/user/register", {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        role: this.state.role
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful registration");
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="role"
            placeholder="role - Parent or Child"
            value={this.state.role}
            onChange={this.handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
