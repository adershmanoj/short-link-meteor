import {Link} from 'react-router';
import React from 'react';
import {Accounts} from 'meteor/accounts-base';
export default class Signup extends React.Component{
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
        Accounts.createUser({email,password},(err)=>{
            if(err)
                this.setState({error:err.reason}); 
            else
                this.setState({error:''});
        })
    }
    render(){
        return (
            <div className='boxed-view'>
                <div className='boxed-view__box'>
                    <h1>Join Short Link</h1>
                    {this.state.error ? <p>{this.state.error}</p>:undefined}
                    <form className='boxed-view__form' onSubmit={this.submitForm.bind(this)} noValidate>
                        <input name='email' ref='email' type='email' placeholder='Email'/>
                        <input name='password' ref='password' type='password' placeholder='Password'/>
                        <button className='button'>Create Account</button>
                    </form>
                    <Link to='/'>Already have an account?</Link>
                </div>
            </div>
        )
    }
}