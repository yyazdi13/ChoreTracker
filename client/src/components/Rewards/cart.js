import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./Rewards";
import AddReward from "./AddReward";
import Button from "@material-ui/core/Button";

export default function Cart() {
  const [info, setInfo] = useState([]);
  const [cart, SetCart] = useState([]);
  var cartArray = [];

  const array = [];
  useEffect(() => {
    loadRewards();
  }, []);

  function loadRewards() {
    axios
      .get("/save")
      .then(response => {
        console.log("it works!");
        response.data.map(item => {
          const data = item.reward;
          return array.push(data);
        });
        setInfo(array);
      })
      .catch(() => {
        console.log("error ");
      });
  }

  const handleCheck = id => {
    const check = info.filter(c => c !== id);
    setInfo(check);
    cartArray.push(id);
    SetCart(curr => [...curr, id]);
  };

  const handleCartCheck = () => {
    SetCart([]);
    loadRewards();
  };

  return (
    <div>
      <AddReward loadRewards={loadRewards} />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Choose a reward!
      </h1>
      <div style={{ display: "flex" }}>
        <div style={{
          border: "1px solid black", 
          width: "450px", margin:"15px", 
          marginLeft: "20px", overflow: "auto", 
          clear: "both", boxShadow: "2px 1px 1px 1px black", 
          height: "300px"}}>
        <h4>
          {info.map(i => (
            <List handleCheck={handleCheck} item={i} id={i} key={i} />
          ))}
        </h4>
        </div>
        <div
          style={{
            overflow: "auto",
            clear: "both",
            marginTop: "20px",
            border: "1px solid black",
            boxShadow: "2px 3px 2px black",
            marginLeft: "55px",
            width: "500px",
            height: "250px"
          }}
        >
          <h2 style={{ textAlign: "center" }}>Cart</h2>
          <Button size="small" variant="contained" style={{marginLeft:"10px"}} onClick={handleCartCheck}>
            Reset cart
          </Button>
          <h4>
            {cart.map(x => (
              <li style={{ marginLeft: "15px" }}>{x}</li>
            ))}
          </h4>
          
        </div>
      </div>
    </div>
  );
}
