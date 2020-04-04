import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./Rewards";
import AddReward from "./AddReward";

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
        <h3>
          {info.map(i => (
            <List handleCheck={handleCheck} item={i} id={i} key={i} />
          ))}
        </h3>
        <div
          style={{
            overflow: "auto",
            clear: "both",
            marginTop: "20px",
            background: "cadetblue",
            border: "2px solid sienna",
            borderRadius: "2pc",
            boxShadow: "2px 2px 2px black",
            marginLeft: "55px",
            width: "500px",
            height: "200px"
          }}
        >
          <h2 style={{ textAlign: "center" }}>Cart</h2>
          <h4>
            {cart.map(x => (
              <li style={{ marginLeft: "15px" }}>{x}</li>
            ))}
          </h4>
          <button
            style={{
              margin: "5px",
              background: "lightsteelblue",
              border: "1px solid coral",
              boxShadow: "1px 1px 1px black",
              fontFamily: "verdana"
            }}
            onClick={handleCartCheck}
          >
            Reset cart
          </button>
        </div>
      </div>
    </div>
  );
}
