import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function ViewChore(){
    const [chores, setChores] = useState([]);
    const [chore, setChore] = useState({
        chore: "",
        owner: ""
    });
    const [amount, setAmount] = useState();
    const array = [];

    useEffect(()=> {
        loadChores();
    }, []);

    function loadChores(){
        axios.get("/api/findChores")
        .then(response => {
            response.data.map(item => {
                const data = item.chore;
                return array.push(data);
            });
            setChores(array);
            
        })
        .catch(() => {
            console.log("error ");
          });
    };

    const handleChange = (e) => {
        const {value} = e.target;
        setChore(value);

    }
    const handleAmountChange = (e) => {
        const {value} = e.target;
        setAmount(value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/postChores", {chore:chore, amount:amount})
        .then(response => {
            console.log(response);
            loadChores();
          })
          .catch(err => {
            console.log(err);
          });
    }

    return (
        <div>
            <div>
            <ul>
            {chores.map(i => (
            <li>{i}</li>
          ))}
            </ul>
            </div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          Add Chores
        </h2>
    
        <form
          style={{
            display: "flex",
            justifyContnent: "center"
          }}
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
            type="text"
            placeholder="Chore"
            name="chore"
            id="chore"
            onChange={handleChange}
          />
       
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
            type="text"
            placeholder="Enter child's username"
            name="owner"
            id="owner"
          />
          <br></br>
          <br></br>
          <Input
          onChange={handleAmountChange}
            style={{
              margin: "15px",
              height: "30px",
              fontSize: "20px"
            }}
            startAdornment={
              <InputAdornment position="start">
                <MonetizationOnIcon />
              </InputAdornment>}
            type="number"
            placeholder="Enter $ amount"
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
        </div>
    )
}