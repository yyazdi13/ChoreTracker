import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: null,
      valerrors: null,
      redirect: null,
      errorMsg: ""
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
      if (!this.state.username || !this.state.password){
        return this.setState({errorMsg: "please put in a username and password"});
      }
      if (this.state.username && this.state.password){
        this.setState({errorMsg: ""});
      }
      if (result.data.error) {
        return this.setState({ error: result.data.message });
      }
      if (result.data.error) {
        return this.setState({ valerrors: result.data.errors });
      }

      else return this.setState({redirect: "/chorepage"})
    });
  }
  render() {
    if (this.state.redirect){
      return <Redirect to={this.state.redirect}></Redirect>
    }
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
        <p style={{color: "red", textAlign: "center"}}>{this.state.errorMsg}</p>
        <br></br>
        <h3
          style={{
            textAlign: "center",
            marginLeft: "30px",
            fontSize: "20px",
            fontFamily: "sans-serif"
          }}
        >
          Login
        </h3>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
       <div style={{display: "flex", justifyContent: "center"}}>
        <form   
        style={{
          border:"1px solid grey",
          boxShadow: " 1px 1px black", 
          width:"300px", 
          padding:"10px", 
          textAlign:"center"}} 
        onSubmit={this.submitHandler}>
          {this.state.valerrors && this.state.username && (
            <p>{this.state.valerrors.username.msg}</p>
          )}
          <Input
              id="input-with-icon-adornment"
              startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>}
            style={{
              marginLeft: "30px",
              marginBottom: "10px",
              height: "30px"
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
          <Input
              id="input-with-icon-adornment"
              startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>}
            style={{
              marginLeft: "30px",
              marginBottom: "10px",
              height: "30px"
            }}
            onChange={this.changeHandler}
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />{" "}
          <br />
          <Button
            type="submit"
            style={{
              backgroundColor: "skyblue",
              marginLeft: "30px",
              height: "33px"
            }}
          >
            Submit
          </Button>
        </form>
        </div>
        <br />
      </div>
    );
  }
}

export default Login;
