import React, { useState } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function Earnings (){
    const [amount, setAmount] = useState();
    const [chore, setChore] = useState("");
    const [total, setTotal] = useState(0);
    const [saved, setSaved] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [message1, setMesssage1] = useState("");
    const [msg2, setMsg2] = useState("");
    const inputChange = (e) => {
        const {value} = e.target;
        setChore(value);
    };

    const submit = (e) => {
        e.preventDefault();
        Axios.get('/api/findChoreAmount', {params: { q: chore}}).then(function(res){
           setAmount(res.data.amount);
           setMsg2("");
           setVisibility("visible");
        }).catch(function(error){
            setMsg2("chore not found");
            setVisibility("hidden");
            console.log(error);
        });
    };

    const handleTotalChange = (e) => {
        const {value} = e.target;
        setTotal(value);
    };

    const handleSavedChange = (e) => {
        const {value} = e.target;
        setSaved(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("/api/postEarnings", {total: total, amount: amount, saved: saved})
        .then(function(res){
           setMesssage1("earning saved!");
           console.log(res);
        }).catch(function(error){
            setMesssage1("Please log in");
            console.log(error);
        })
    };

    return (
        <>
            <h1 style={{textAlign: "center", margin:"0"}}>Earnings</h1>
            <form onSubmit={submit}>
                <label>Create earnings</label>
                <br></br>
                <Input onChange={inputChange} placeholder="chore name"  startAdornment={
            <InputAdornment position="start">
              <Icon>add_circle</Icon>
            </InputAdornment>}/>
                <p style={{color: "red"}}>{msg2}</p>
                <Button style={{backgroundColor: "steelblue"}} type="submit">Submit</Button>
            </form>
            <br/>
            <div name="amount" value={amount}></div>
            <form style={{visibility: visibility}} onSubmit={handleSubmit}>
                <label>Enter total and saved</label>
                <br/>
                <Input onChange={handleTotalChange} placeholder="total" name="total" startAdornment={
            <InputAdornment position="start">
              <MonetizationOnIcon/>
            </InputAdornment>}/>
                <Input onChange={handleSavedChange} placeholder="saved" name="saved" startAdornment={
            <InputAdornment position="start">
              <MonetizationOnIcon/>
            </InputAdornment>}/>
                <p style={{color: "red"}}>{message1}</p>
                <Button style={{backgroundColor: "steelblue" }} type="submit">Submit</Button>
            </form>
            <br/>
        </>
    )
}
