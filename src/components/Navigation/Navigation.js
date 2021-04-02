import React from 'react';
import './Navigation.css';
import logo from './face.png';

const Navigation=(props)=>{
  const { isSignedIn, onRouteChange }=props
  return (
    <div>
      <header className="header">
        <div className="logo">
        <img src={logo} alt="Logo"/>
        {/* <h1>Detect Faces</h1> */}
        </div>

        {
          (isSignedIn===true)
          ?
            <div className="buttons">
                <button onClick={()=>onRouteChange('signIn')}>Sign Out</button>
            </div>

          :
          <div className="buttons">
                <button onClick={()=>onRouteChange('register')}>Register</button>
                <button onClick={()=>onRouteChange('signIn')}>Sign In</button>
          </div>
        }

        
      </header>
    </div>
  );
}



export default Navigation;