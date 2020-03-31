// import React, { Component } from "react";
// import Home from "./components/home";
// import List from "./components/Rewards/Rewards"
// import Home from "./components/home";
// //import Nav from "./components/Nav";
// //import ChoreCard from "./components/ChoreCard";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// //import ReactDOM from "react-dom";
// import "./index.css";
// //import APP from "./App.js";

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Switch>
//           <Route exact path="/" component={Home} />
//         </Switch>
//       </Router>
//     );
//   }
// }

// export default App;
import React, { useEffect, useState } from 'react';
import List from './components/Rewards/Rewards';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Nav from "./components/Nav"
import ChoreCard from "./components/ChoreCard"
import "./index.css";
import Home from "./components/home";



function App() {
  const [info, setInfo] = useState([])
  const array = [];
  useEffect(() => {
    axios.get('/save')
    .then((response)=>{
      console.log("it works!")
      response.data.map((item) => {const data = item.reward;
        return array.push(data);
      })
      setInfo(array);
    })
    .catch(() =>{
      console.log('error ')
    })
  }, [])

  // function CreateReward(){
  //   axios.post("/addReward")
  //   .then((response)=>{
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }
  
  return (
    <Router>
    <Switch>
          <Route exact path={"/reward"}>
            <Nav/>
            <h1 style={{textAlign: "center"}}>Choose a reward!</h1>
          <h3>{info.map(i => <List item={i}/>)}</h3>
          <form>
            <input placeholder="insert reward" name="reward"></input>
            <button>submit</button>
          </form>
          </Route>
        
    <Route exact path={"/"}>
      <div className="bg">
      <Nav />
      <Home/>
      </div>
    </Route>
    </Switch>
    </Router>
   
  );
}

export default App;
