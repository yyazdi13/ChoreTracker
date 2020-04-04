import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Addchore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chore: "",
      owner: "",
      amount: "",
      done: false,
      choredata: null,
      success: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submithandler = this.submithandler.bind(this);
    this.getChores = this.getChores.bind(this);
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
        choredata: result.data,
        errors: null,
        success: true
      });
    });
  }
  getChores() {
    axios
      .get("/api/addchore")
      .then(chores => this.setState({ chores: chores.data }));
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
          <input
            style={{
              margin: "15px",
              marginLeft: "80px",
              border: "2px solid",
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
          <input
            style={{
              margin: "15px",
              border: "2px solid",
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
          <input
            style={{
              margin: "15px",
              border: "2px solid",
              height: "30px",
              fontSize: "20px"
            }}
            value={this.state.amount}
            type="number"
            placeholder="Enter $ amount"
            onChange={this.changeHandler}
            name="amount"
            id="amount"
          />
          <br />
          <br></br>
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              margin: "15px",
              height: "33px"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Addchore;
