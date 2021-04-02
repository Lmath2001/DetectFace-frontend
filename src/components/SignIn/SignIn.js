import React from 'react';
import './SignIn.css';

class SignIn extends React.Component{

  constructor(props){
    super(props);
    this.state={
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmail=(event)=>{
    this.setState({signInEmail:event.target.value});
  }

  onPassword=(event)=>{
    this.setState({signInPassword:event.target.value});
  }

  onSubmit=()=>{
    fetch('https://blooming-beach-98498.herokuapp.com/signin', {
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      if(data.id)
      {
        this.props.loadUser(data);
        this.props.onRouteChange('home');
      }
    })
    .catch(console.log)
    
  }

  render(){
    const { onRouteChange }=this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center sign-in">
        <main className="pa4 black-80 center">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 near-white">Sign In</legend>
              <div className="mt3">
                <label className="db fw5 lh-copy f6 w-50 silver" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw5 lh-copy f6 silver" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--near-white bg-transparent grow pointer f6 dib center near-white"
                type="submit"
                value="Sign In"
                onClick={this.onSubmit}
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer center b--near-white silver">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;