import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordconf: "",
      userdata: null,
      success: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submithandler = this.submithandler.bind(this);
  }
  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  submithandler(event) {
    event.preventDefault();
    axios.post("/api/register", this.state).then((result) => {
      if (result.data.errors) {
        return this.setState(result.data);
      }
      //once user fixes errors remove the errors and set the user's data
      return this.setState({
        userdata: result.data,
        errors: null,
        success: true,
      });
    });
  }
  render() {
    return (
      <div>
        <h3
          style={{
            textAlign: "center",
            marginLeft: "30px",
            fontSize: "20px",
            fontFamily: "sans-serif",
          }}
        >
          Register{" "}
        </h3>
        {this.state.success && <p>You are now registered!</p>}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form
            style={{
              border: "1px solid grey",
              boxShadow: " 1px 1px black",
              width: "300px",
              padding: "10px",
              textAlign: "center",
            }}
            onSubmit={this.submithandler}
          >
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                height: "30px",
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
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                height: "30px",
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
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              style={{
                marginLeft: "30px",
                marginBottom: "10px",
                height: "30px",
              }}
              type="password"
              placeholder="Password Confirmation"
              onChange={this.changeHandler}
              name="passwordconf"
              id="passwordconfi"
            />
            {this.state.errors && this.state.errors.passwordconf && (
              <p style={{ color: "red" }}>
                {this.state.errors.passwordconf.msg}
              </p> //If left blank shows the error password confirmationn required/
              //and if it does not match the password an error appears saying it doesn't match
            )}
            <br />
            <Button
              type="submit"
              style={{
                backgroundColor: "skyblue",
                marginLeft: "30px",
                height: "33px",
              }}
            >
              Submit
            </Button>
          </form>
        </div>
        <br />

        <br />
      </div>
    );
  }
}

export default Register;
