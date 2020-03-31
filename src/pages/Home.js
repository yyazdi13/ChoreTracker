import React from 'react';
import '../App.css';
import Nav from "../components/Nav"
import ChoreCard from "../components/ChoreCard"
import Kids from "../kidsfrontEnd.html/kidsfrontEnd"


function Home() {
  return (
    <div>
      <div className="bg">
      <Nav />
      <ChoreCard />
      
      </div>
        
    </div>
   
  );
}

export default Home;