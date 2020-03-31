import React from 'react';
import '../App.css';
import Nav from "../components/Nav"
import ChoreCard from "../components/ChoreCard"
import Kids from "../kidsfrontEnd.html/kidsfrontEnd"
import { Checkbox } from '@material-ui/core';


function KidsPage() {
  return (
    <div>
      <div className="bg">
      <Nav />
      <ChoreCard />
      <Checkbox/>
      <Kids/>      
      </div>
        
    </div>
   
  );
}

export default KidsPage;