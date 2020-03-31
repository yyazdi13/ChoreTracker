import React from 'react';
import './App.css';
import Home from "./pages/Home"
import KidsPage from "./pages/KidsPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/kids" component={KidsPage} />
   
        </Switch>
      </div>
    </Router>
  );
}

export default App;
