import MastHead from './NBTE WebsiteMasthead.png'
import React from 'react' 
import './Mast.css'
const mast = () => (
 <header className = "Mast"  >
  
     <img  className= "center" src={MastHead} alt = "Masthead"/>
      
  <h1>NBTE Self-Study Questionnaire Portal for Polytechnic Programmes</h1>
 </header>   
);
export default mast;