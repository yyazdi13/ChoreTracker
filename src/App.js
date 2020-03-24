import React from 'react';
import './App.css';
import Nav from "./components/Nav"
import ChoreCard from "./components/ChoreCard"
import kids from "./kidsfrontEnd.html/kidsfrontEnd"


function App() {
  return (
    <div>
      <div className="bg">
      <Nav />
      <ChoreCard />
      <Kids/>
      </div>
        
    </div>
   
  );
}

export default App;
