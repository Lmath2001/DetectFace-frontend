import React from'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Text from './components/Text/Text.js';
import ImageInput from './components/ImageInput/ImageInput.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import 'tachyons';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 850
      }
    }
  }
}



const initialState={
      input:'',
      imageURL:'',
      box:[],
      route:'signIn',
      isSignedIn:'',
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'',
        joined:''
      }
}


class App extends React.Component{
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    const { id, name, email, password, entries, joined}=data
    this.setState({
       user:{
        id:id,
        name:name,
        email:email,
        password:password,
        entries:entries,
        joined:joined
      }
    })
  }

  onRouteChange=(routeValue)=>{
    if(routeValue==='home'){
      this.setState({isSignedIn:true})
    }
    else{
      this.setState(initialState)
    }
    this.setState({route:routeValue})
  }

  calculateFaceBox=(response)=>{
     
      const array=response.outputs[0].data.regions;
      let imageBox=document.getElementById('imageBox');
      let width=Number(imageBox.width);
      let height=Number(imageBox.height);
      return array.map((element)=>{
        let faceBox=element.region_info.bounding_box;
        return{
          
          leftCol:faceBox.left_col * width,
          rightCol:width-(faceBox.right_col * width),
          topRow:faceBox.top_row * height,
          bottomRow:height-(faceBox.bottom_row * height)
        } 
    });
  }

  displayFaceBox=(data)=>{
    this.setState({box:data});
    // console.log(this.state.box);
  }

  onSearchInput=(event)=>{
    this.setState({input:event.target.value})
  }

  onButtonClick=()=>{
    this.setState({imageURL:this.state.input})
    
    fetch("http://localhost:3000/imageUrl",{
      method :'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        input:this.state.input
      })
      })
      .then((response)=>{
        return response.json();
      })
      .then((response)=>{
          if(response){
            fetch("http://localhost:3000/image",{
              method:'put',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                id:this.state.user.id
              })
            })
            .then((response)=>{
                return response.json();
              })
            .then((count)=>{
                this.setState(Object.assign(this.state.user, {entries : count}))
              })
            .catch(console.log)
          }
      this.displayFaceBox(this.calculateFaceBox(response));
    })
    .catch((error)=>{
      console.log(error);
    })
  }

 
  render(){
    return(
      <div>
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

        {(this.state.route==='home')
        ?
          <div>
            <Text name={this.state.user.name} rank={this.state.user.entries}/>
            <ImageInput onSearchInput={this.onSearchInput} onButtonClick={this.onButtonClick}/>
            <FaceRecognition boundingBox={this.state.box} imageURL={this.state.imageURL}/>
          </div>
        : (this.state.route==='signIn'
          ?
            <div>
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            </div>
          :
            <div>
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            </div>
        )
        }
      </div>
    );
  }
}

export default App;
