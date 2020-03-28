import React, { useEffect, useState } from 'react';
import List from './Components/Rewards/Rewards';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';


function App() {
  const [info, setInfo] = useState([])
  const array = [];
  useEffect(() => {
    axios.get('/save')
    .then((response)=>{
      response.data.map((item) => {const data = item.reward;
        array.push(data);
      })
      setInfo(array);
    })
    .catch(() =>{
      console.log('error ')
    })
  }, [])
  
  return (
    <Router>
    <div>
        <Switch>
          <Route exact path={"/reward"}>
          <h3>{info.map(i => <List item={i}/>)}</h3>
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
