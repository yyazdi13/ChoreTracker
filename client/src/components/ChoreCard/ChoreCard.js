import React, { useState, useEffect } from 'react';
import Card from './index';
import Axios from 'axios';

export default function ChoreCard (){
    const [amount, setAmount] = useState();
    const [Chore, setChore] = useState([]);
    const array = [];

    useEffect(()=>{
        getChores();
    },[])

    const getChores = (data) => {
        Axios.get('/api/findChores')
        .then(function(response){
            response.data.map(i => {
                data = i.chore;
                array.push(data);
            })
            setChore(array);
        })
        .catch(function(err){
            console.log(err);
        })

    }

    return (
        <>
        <h1 style={{margin:"0", textAlign:"center"}}>Chores</h1>
        <br/>
        <div style={{display:"flex"}}>
        {Chore.map(i=>(<Card chore={i}/>))}
        </div>
        <br/>
        </>
    )
}