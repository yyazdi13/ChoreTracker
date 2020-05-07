import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';

export default function AddReward(props) {
  const [item, setReward] = useState({ reward: "error" });
  const [user, Setuser] = useState({ username: "error" });
  const [visibility, setVisibility] = useState("hidden");

  const handleSubmit = event => {
    event.preventDefault();
    console.log(item);
    axios
      .post("/api/addReward", { reward: item.reward })
      .then(response => {
        console.log(response);
        props.loadRewards();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setReward({ reward: value });
  };

  const handleUserInput = e => {
    const { value } = e.target;
    Setuser({ username: value });
  };

  const handleUserSubmit = e => {
    e.preventDefault();
    axios.get("/user", { params: { q: user.username } }).then((res, err) => {
      if (err) {
        console.log(err);
      } else if (!res.data.username) {
        alert("User not found");
      } else {
        console.log(res.data.username);
        setVisibility("visible");
      }
    });
  };

  return (
    <>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>}
          onChange={handleUserInput}
          name="user"
          placeholder="Enter parent username"
        ></Input>
        <Button
          variant="contained" size="small"
          style={{ margin: "5px" }}
          onClick={handleUserSubmit}>
          Submit
        </Button>
      </form>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Icon>add_circle</Icon>
            </InputAdornment>
          }
          style={{visibility: visibility}}
          onChange={handleInputChange}
          placeholder="insert reward"
          name="reward"
        ></Input>
        <Button 
        variant="contained" 
        size="small" 
        style={{visibility:visibility, margin:"5px"}} 
        onClick={handleSubmit}>
        Submit
        </Button>
      </form>
    </>
  );
}
