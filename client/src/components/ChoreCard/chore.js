import React, { Component } from "react";
import axios from "axios";
import Chore from "./index";

class Chorepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chores: null,
      chore: "",
      isloggedin: true
    };
    this.getChores();
    axios.get("/api/isLoggedin").then(res => {
      if (!res.data) {
        return this.setState({ isloggedin: false });
      }
    });
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getChores = this.getChores.bind(this);
  }
  getChores() {
    axios
      .get("/api/showChores")
      .then(chores => this.setState({ chores: chores.data }));
  }

  submitHandler(event) {
    event.preventDefault();
    axios.post("/api/addchore", { chore: this.state.chore }).then(res => {
      this.setState({ chore: "" });
      this.getChores();
    });
  }
  changeHandler(event) {
    this.setState({ chore: event.targe.value });
  }
  render() {
    return this.state.isloggedin ? (
      <div>
        <button
          onClick={() =>
            axios.get("/api/logout").then(res => (window.location = "/"))
          }
        >
          Logout
        </button>
        <form onSubmit={this.submitHandler}>
          <input
            value={this.state.chore}
            placeholder="chore" onChange={this.changeHandler}
            type="text" name="chore" id="chore" >
            <button type="submit">Submit</button>
          </input>
        </form>
        {this.state.chores &&
          this.state.chores.map(chore => {
            return (
              <Chore getChores={this.getChores} key={chore.id} info={chore} />
            );
          })}
      </div>
    ) : (
      <h3>Please login</h3>
    );
  }
}

export default Chorepage;
