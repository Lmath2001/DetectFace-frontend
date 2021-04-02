import React from 'react';
import './ImageInput.css';

const ImageInput=(props)=>{
  const { onSearchInput, onButtonClick }=props;
  return (
    <div className="inputImage">
      <input className="input" type="text" name="text" id="text" placeholder="Enter Image URL" onChange={onSearchInput}/>
      <button onClick={onButtonClick}>Detect</button>
    </div>
  );
}



export default ImageInput;