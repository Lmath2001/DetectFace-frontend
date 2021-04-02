import React from 'react';
import './Text.css';

const Text=(props)=>{
  const { name , rank}=props;
  return (
    <div className="text">
     <p className="para-1">{name}, it's time to detect faces</p>
     <p>Your Total Count<span className="rank"> #{rank} </span></p>
    </div>
  );
}



export default Text;