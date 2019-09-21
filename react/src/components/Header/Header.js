import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import './../../css/bootstrap.min.css';
import './../../font/css/fontawesome-all.min.css';

export default class Header extends Component {
  render() {
    return (
          <div style={{width:'100%', height:'90px'}} className="bg-primary">
            <div style={{height:'90px',position:'relative'}} className="bg-light">
                <div style={{position:'absolute'}} className="pl-3 pt-3">
                    <Link to="/home"><h1>Photopedia</h1></Link>
                </div>

                <div style={{height:'90px'}}>
                  <ul style={{height:'90px'}} className="navbar-nav navbar-expand bg-light">
                  <li className="nav-item m-4 ">
                  <Link to ="/about" className="nav-link">About</Link>
                  </li> 
                  <li className="nav-item m-4">
                  <Link to ="/gallery" className="nav-link">Gallery</Link></li> 
                        <li className="nav-item m-4">
                          <Link to ="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item m-4">
                          <Link to ="/signup" className="nav-link">Sign Up</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
          </div>
    );
  }
}