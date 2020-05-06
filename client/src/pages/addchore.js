import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewChore from '../components/ChoreCard/ViewChore';

class Addchore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chore: "",
      owner: "",
      amount: "",
      chores: [],
      done: false,
      choredata: null,
      success: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submithandler = this.submithandler.bind(this);
    this.getChores = this.getChores.bind(this);
  }
  componentDidMount(){this.getChores()}

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submithandler(event) {
    event.preventDefault();
    axios.post("/api/addchore", this.state).then(result => {
      if (result.data.errors) {
        return this.setState(result.data);
      }
      //once user fixes errors remove the errors and set the user's data
      return this.setState({
        choredata: result.data,
        errors: null,
        success: true
      });
    });
  }
  getChores() {
    axios
      .get("/api/findChores")
      .then(res => {
        for (let i = 0; i < res.data.length; i++){
          var c = res.data[i].chore;
          this.setState({chores: [...this.state.chores, c]})          
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          Add Chores{" "}
        </h2>
        {this.state.success && (
          <p>
            You have added the {this.state.chore} chore for {this.state.owner}
          </p>
        )}
        <form
          style={{
            display: "flex",
            justifyContnent: "center"
          }}
          onSubmit={this.submithandler}
        >
          <Input
          startAdornment={
            <InputAdornment position="start">
              <Icon>add_circle</Icon>
            </InputAdornment>}
            style={{
              margin: "15px",
              marginLeft: "80px",
              height: "30px",
              fontSize: "20px"
            }}
            value={this.state.chore}
            type="text"
            placeholder="Chore"
            onChange={this.changeHandler}
            name="chore"
            id="newchore"
          />
          {this.state.errors && this.state.errors.chore && (
            <p>{this.state.errors.chore.msg}</p> //If left blank shows the error - chore required
          )}
          <br />
          <br></br>
          <Input
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>}
            style={{
              margin: "15px",
              height: "30px",
              fontSize: "20px"
            }}
            value={this.state.owner}
            type="text"
            placeholder="Enter child's username"
            onChange={this.changeHandler}
            name="owner"
            id="owner"
          />
          <br></br>
          <br></br>
          <Input
            style={{
              margin: "15px",
              height: "30px",
              fontSize: "20px"
            }}
            startAdornment={
              <InputAdornment position="start">
                <MonetizationOnIcon />
              </InputAdornment>}
            value={this.state.amount}
            type="number"
            placeholder="Enter $ amount"
            onChange={this.changeHandler}
            name="amount"
            id="amount"
          />
          <br />
          <br></br>
          <Button
            type="submit"
            style={{
              backgroundColor: "skyblue",
              margin: "15px",
            }}
          >
            Submit
          </Button>
        </form>
          <h3>chores: {this.state.chores.map(i => <p>{i}</p>)}</h3>
        <ViewChore/>
      </div>
    );
  }
}

export default Addchore;
