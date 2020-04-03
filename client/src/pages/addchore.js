import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Addchore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chore: "",
      amount: ""
      //done: "null"
      //choredata: null,
      //success: false
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
    axios.post("/api/addchore", this.state).then(result => {
      if (result.data.errors) {
        return this.setState(result.data);
      }
      //once user fixes errors remove the errors and set the user's data
      return this.setState({
        chore: "",
        amount: ""
      });
    });
  }
  render() {
    return (
      <div>
        <h3>Add Chores</h3>
        <form onSubmit={this.submithandler}>
          <input
            value={this.state.chore}
            type="text"
            placeholder="Chore"
            onChange={this.changeHandler}
            name="chore"
            id="newchore"
          />
          <br />
          <br></br>
          <input
            value={this.state.amount}
            type="number"
            placeholder="Amount"
            onChange={this.changeHandler}
            name="amount"
            id="amount"
          />
          <br />
          <br></br>
          <button type="submit" style={{ backgroundColor: "green" }}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Addchore;
