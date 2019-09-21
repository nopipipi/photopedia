import React, {Component} from 'react';
import '../css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import axios from 'axios';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            firstname : '',
            lastname : '',
            username : '',
            password : '',
            check : ''
        }
    }

    doSignUp(){
        const { password, check } = this.state;
        // perform all neccassary validations
        if (password !== check) {
            alert("Passwords don't match");
        } else {
            const {cookies} = this.props
            const {history} = this.props
            axios.post('http://localhost:8000/daftar', this.state)
            .then(res=>{
                cookies.set('token', res.data.token, {path : '/'})
                cookies.set('id', res.data.id, {path : '/'})
                history.push('/')
            })
            .catch(err=>{
                alert('Email dan password tidak valid')
                console.log(err)
            })
        }
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    doLogin(){
        const {history} = this.props
        history.push('/login')
    }

    render(){
        return(
            <div className="mt-5">
                <div className="container border pt-5 pb-5 pl-5 w-100 bg-light" style={{height:'500px'}}>
                    <div className="container bg-primary float-left p-5 w-25 text-white text-center h-100">
                        <h3 className="mt-1">Welcome Back!</h3>
                        <br/>
                        <p>To keep connected with us please login with your personal info</p>
                        <br/>
                        <button className="btn btn-outline-light btn-lg w-100" type="button" onClick={this.doLogin.bind(this)}>
                        SIGN IN
                        </button>
                    </div>

                    <div className="mb-5 w-75 h-100 float-left">
                        <form className="mx-auto h-100 pl-5 pr-5">
                            <br/>
                            <h2>Create Account</h2>
                            <br/>
                            <div className="form-inline">
                                <input type="text" placeholder="first name" name="firstname" className="form-control w-45 mr-2" value={this.state.firstname} onChange={this.setValue.bind(this)} /> 
                                <input type="text" placeholder="last name" name="lastname" className="form-control w-45" value={this.state.lastname} onChange={this.setValue.bind(this)} />
                            </div>
                            <br />
                            <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.setValue.bind(this)} className="form-control" maxLength="20"/>
                            <br />
                            <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.setValue.bind(this)} maxLength="16" />
                            <br />
                            <input type="password" placeholder="confirm password" name="check" value={this.state.check} onChange={this.setValue.bind(this)} className="form-control" />
                            <br />
                            <button className="btn btn-primary" type="button" onClick={this.doSignUp.bind(this)}>Register</button>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(Signup));