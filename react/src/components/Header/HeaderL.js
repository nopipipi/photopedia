import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import './../../css/bootstrap.min.css';
import './../../font/css/fontawesome-all.min.css';
import {withCookies} from 'react-cookie';

class HeaderL extends Component {
  constructor(props){
    super(props)

    const {cookies} = this.props
    this.state = {
      id : cookies.get('id')
    }
  }

  clickHandler(){
    const {cookies} = this.props
    const {history} = this.props
    cookies.remove('id')
    cookies.remove('token')
    history.push('/')
  }
  render() {
    return (
            <div style={{width: '100%', height:'90px',position:'relative'}} className="bg-light">
              <div style={{position:'absolute'}} className="pl-3 pt-3">
                  <Link to="/home"><h1>Photopedia</h1></Link>
              </div>

              <div style={{height:'100%'}}>
                <ul className="navbar-nav navbar-expand bg-primary">
                  <li className="nav-item m-4">
                    <Link to ={`/profile/${this.state.id}`} className="nav-link text-light">Profile</Link>
                  </li>
                  <li className="nav-item m-4">
                    <Link to ='/' className="nav-link text-light" onClick={this.clickHandler.bind(this)}>Logout</Link>
                  </li>
                </ul>

                <ul className="navbar-nav navbar-expand bg-light">
                    <li className="nav-item m-4 ">
                    <Link to ="/about" className="nav-link">About</Link>
                    </li> 
                    <li className="nav-item m-4">
                    <Link to ="/gallery" className="nav-link">Gallery</Link></li> 
                </ul>
              </div>
            </div>
    );
  }
}

export default withCookies(HeaderL)