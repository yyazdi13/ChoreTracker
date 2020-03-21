import React from 'react';
import './App.css';
import Nav from "./components/Nav"
import ChoreCard from "./components/ChoreCard"


function App() {
  return (
    <div>
      <div className="bg">
      <Nav />
      <ChoreCard />
      </div>
        
    </div>
   
  );
}

export default App;
