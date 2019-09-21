import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username : '',
            password : ''
        }
    }

    doLogin(){
        const{cookies}=this.props
        const{history}=this.props
        axios.post('http://localhost:8000/login', this.state)
        .then(res=>{
            cookies.set('token', res.data.token, {path:'/'})
            cookies.set('id', res.data.id, {path:'/'})
            history.push('/')
        })
        .catch(err=>{
            alert('Email dan password tidak valid')
            console.log(err)
        })
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    doDaftar(){
        const {history} = this.props
        history.push('/signup')
    }

    render(){
        return(
            <div className="mt-5">
                <div className="container border pt-5 pb-5 pl-5 w-100 bg-light" style={{height:'500px'}}>
                    <div className="bg-primary float-left p-5 w-25 text-white text-center h-100">
                        <h3 className="mt-1">Hello, Friend!</h3>
                        <br/>
                        <p>Enter your personal details to start journey with us</p>
                        <br/>
                        <button className="btn btn-outline-light btn-lg w-100" type="button" onClick={this.doDaftar.bind(this)}>
                        SIGN UP
                        </button>
                    </div>

                    <div className="mb-5 mx-auto w-75 float-right border border-right-0 border-top-0 border-bottom-0">
                        <form className="mx-auto w-75">
                            <br/><br/>
                            <h2>Sign in to Photopedia</h2>
                            <hr/>
                            <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.setValue.bind(this)} maxLength="20" className="form-control"/>
                            <br/>
                            <input type="password" placeholder="password" className="form-control" maxLength="16" name="password" value={this.state.password} onChange={this.setValue.bind(this)} />
                            <br />
                           <button className="btn btn-primary" type="button" onClick={this.doLogin.bind(this)}>Sign in</button>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(Login));