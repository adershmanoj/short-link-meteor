import {Link} from 'react-router';
import React from 'react';
import {Meteor} from 'meteor/meteor';
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error: ''
        }
    }
    submitForm(e){
        e.preventDefault();
        let email=this.refs.email.value.trim();
        let password=this.refs.password.value.trim();
        if(password.length<9)
            return this.setState({error:'Password must be more than 8 characters long'});
        Meteor.loginWithPassword({email}, password, (err)=>{
            if(err)
                this.setState({error:err.reason})
            else
                this.setState({error:''})
        });
    }
    render(){
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Link</h1>
                    {this.state.error ? <p>{this.state.error}</p>:undefined}
                    <form className='boxed-view__form' onSubmit={this.submitForm.bind(this)}>
                        <input name='email' ref='email' type='email' placeholder='Email'/>
                        <input name='password' ref='password' type='password' placeholder='Password'/>
                        <button className='button'>Login</button>
                    </form>
                    <Link to='/signup'>Don't Have an account? Signup Here</Link> 
                </div>
            </div>
        )   
    }
}