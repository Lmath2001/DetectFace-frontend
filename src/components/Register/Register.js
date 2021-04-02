import React from 'react';
import '../SignIn/SignIn.css'

class Register extends React.Component{
 
  constructor(props){
    super(props);
    this.state={
      registerName:'',
      registerEmail:'',
      registerPassword:''
    }
  }

  onName=(event)=>{
    this.setState({registerName:event.target.value});
  }

  onEmail=(event)=>{
    this.setState({registerEmail:event.target.value});
  }

  onPassword=(event)=>{
    this.setState({registerPassword:event.target.value});
  }

  onSubmit=()=>{
    fetch("http://localhost:3000/register",{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:this.state.registerName,
        email:this.state.registerEmail,
        password:this.state.registerPassword
      })
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        if(data.id){
          this.props.loadUser(data);
          this.props.onRouteChange('signIn');
        }
      })
      .catch(console.log);
  }

  render(){
    // const { onRouteChange }=this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center sign-in">
        <main className="pa4 black-80 center">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 near-white">Register</legend>
              <div className="mt3">
                <label className="db fw5 lh-copy f6 w-50 silver" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onName}
                />
              </div>
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
                value="Register"
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;