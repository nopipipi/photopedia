import React, {Component} from 'react';

class Footer extends Component{
    render(){
        return(
            <div className="col-sm-12 mt-5 p-5 float-right bg-primary text-white">
                <div className="row col-sm-12">
                    <div className="col-sm-2">
                        <h6>Information</h6><hr className="bg-white"/>
                        <p>Jl.Jambi No.27-A, Medan, Sumatera Utara, Indonesia</p>
                        <p> (061) 4568614 </p>
                        <p> (061) 4568615</p>
                    </div>
                    <div className="col-sm-2">
                        <h6>Shop</h6><hr className="bg-white"/>
                        <p>Landscape</p>
                        <p>Potrait</p>
                        <p>Nature</p>
                    </div>
                    <div className="col-sm-2">
                        <h6>Support</h6><hr className="bg-white"/>
                        <p>Help</p>
                        <p>FAQ</p>
                        <p>About Us</p>
                    </div>
                    <div className="col-sm-2">
                        <h6>Contact</h6><hr className="bg-white"/>
                        <p>photopedia@yahoo.com</p>
                        <p>photopedia@gmail.com</p>
                        <p>photopedia</p>
                    </div>
                    {/* KOTAK NEWSLETTER */}
                    <div style={{width:'330px'}} className="bg-light text-dark m-3 p-4">
                        <h5>Subscribe to our newsletter</h5> 
                        <hr />
                        <div className="input-group">
                            <input type="text" placeholder="email" className="form-control w- mx-auto"/>
                            <button type="button" className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>                 
                </div>
            </div>
        )
    }
}
export default Footer;