import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordconf: "",
      userdata: null,
      success: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submithandler = this.submithandler.bind(this);
  }
  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submithandler(event) {
    event.preventDefault();
    axios.post("/api/register", this.state).then(result => {
      if (result.data.errors) {
        return this.setState(result.data);
      }
      //once user fixes errors remove the errors and set the user's data
      return this.setState({
        userdata: result.data,
        errors: null,
        success: true
      });
    });
  }
  render() {
    return (
      <div>
        <h3
          style={{
            display: "flex",
            marginLeft: "30px",
            fontSize: "20px",
            fontFamily: "sans-serif"
          }}
        >
          Register{" "}
        </h3>
        {this.state.success && <p>You are now registered!</p>}
        <form onSubmit={this.submithandler}>
          <input
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            type="text"
            placeholder="Username"
            onChange={this.changeHandler}
            name="username"
            id="usernamereq"
          />
          {this.state.errors && this.state.errors.username && (
            <p style={{ color: "red" }}>{this.state.errors.username.msg}</p> //If left blank shows the error - username required
          )}

          <br />
          <input
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            type="password"
            placeholder="Password"
            onChange={this.changeHandler}
            name="password"
            id="passwordreq"
          />
          {this.state.errors && this.state.errors.password && (
            <p style={{ color: "red" }}>{this.state.errors.password.msg}</p> //If left blank shows the error that password is required
          )}
          <br />
          <input
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            type="password"
            placeholder="Password Confirmation"
            onChange={this.changeHandler}
            name="passwordconf"
            id="passwordconf"
          />
          {this.state.errors && this.state.errors.passwordconf && (
            <p style={{ color: "red" }}>{this.state.errors.passwordconf.msg}</p> //If left blank shows the error password confirmationn required/
            //and if it does not match the password an error appears saying it doesn't match
          )}
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

        <br />
      </div>
    );
  }
}

export default Register;
