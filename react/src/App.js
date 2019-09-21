import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './font/css/fontawesome-all.min.css';
import {withCookies} from 'react-cookie';
import Header from './components/Header/Header';
import HeaderL from './components/Header/HeaderL';
import Footer from './components/Footer';
import { Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import AddProduct from './pages/AddProduct';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import EditProduct from './pages/EditProduct';
import SellerProfile from './pages/SellerProfile';

class App extends Component {
  render() {
    const {cookies} = this.props

    function HeaderType(props){
      const isLoggedIn = cookies.get('token')
      if (isLoggedIn) {
        return <HeaderL />
      }
      return <Header />
    }
    return (
      <div className="container-fluid p-0 bg-white">
          <HeaderType />
          <div style={{width: '100%'}} className="container-fluid p-0">
            <Route path="/" exact component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/gallery" component={Gallery}/>
            <Route path="/addprod" component={AddProduct}/>
            <Route path="/profile/:username" component={Profile}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path='/editprod/:id' component={EditProduct}/>
            <Route path='/sellerprofile/:username' component={SellerProfile}/>
          </div>
          <Footer />
      </div>
    );
  }
}

export default withCookies(App);
