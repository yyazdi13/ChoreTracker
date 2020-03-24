import React from "react";


export default class Kids extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Chore'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('You chore: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
             your Chort:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="plates">Dishes</option>
              <option value='cloth'>Lundry</option>
              <option value="brum">sweep</option>
              <option value="food">Feed Dogs</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

