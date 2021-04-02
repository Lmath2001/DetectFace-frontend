import React from 'react';
import './FaceRecognition.css';

const FaceRecognition=(props)=>{
  const { boundingBox ,imageURL }=props;
  return (
    <div className="center">
      <div className="image">
        <img id='imageBox' src={imageURL} alt="" width="500px" height="auto"/>
        {boundingBox.map((boxes,index)=>{
          return (<div key={index} className="blue-box" style={{top:boxes.topRow, left:boxes.leftCol, right:boxes.rightCol, bottom:boxes.bottomRow}}></div>);
        })
        }
      </div>
    </div>

  );
}



export default FaceRecognition;