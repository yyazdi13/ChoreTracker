import React, {useEffect, useState} from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import List from "./Rewards";

export default function AddReward(props) {
    const [item, setReward] = useState({reward: "error"})
    const [user, Setuser] = useState({username: 'error'})
    const [visibility, setVisibility] = useState("hidden");
    

    const handleSubmit = event => {
      event.preventDefault();
      console.log(item);
      axios.post("/api/addReward", ({reward: item.reward}))
      .then((response)=>{
        console.log(response);
        props.loadRewards();
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
    const handleInputChange = e => {
      const {name, value} = e.target;
      setReward({reward: value});
    }

    const handleUserInput = e => {
        const {value} = e.target;
        Setuser({username: value});
    }

    const handleUserSubmit = e => {
        e.preventDefault();
        axios.get("/user", { params: { q: user.username } }).then((res, err)=>{
            if(err){console.log(err)}
           else if (!res.data.username){
               alert("User not found")
           }
           else {
               console.log(res.data.username);
               setVisibility('visible');
            }
        })   
    }


    return (
            <>
              <form style={{display: "flex", justifyContent: "center"}}>
                <input style={{margin: "5px", marginTop: "10px", border: "2px solid coral", boxShadow: '1px 1px 1px black', height: "30px", fontSize:"20px", background: "lightsteelblue"}} onChange = {handleUserInput} name="user" placeholder="Enter parent username"></input>
                <button style={{margin: "5px", marginTop: "10px", border: "2px solid coral", boxShadow: '1px 2px 1px black', height: "33px", background:"lightsteelblue", fontFamily:"verdana"}} onClick={handleUserSubmit}>Submit</button>
              </form>
              <form style={{display: "flex", justifyContent:"center"}}>
                <input style={{visibility: visibility, margin: '5px', border: "2px solid coral", boxShadow: '1px 1px 1px black', height: "30px", fontSize:"20px", background: "lightsteelblue"}}onChange={handleInputChange} placeholder="insert reward" name="reward"></input>
                <button style={{visibility: visibility, margin: "5px", border: "2px solid coral", boxShadow: '1px 2px 1px black', height: "33px", background:"lightsteelblue", fontFamily:"verdana"}} onClick={handleSubmit}>Submit</button>
              </form>
            </>   
    );
  }