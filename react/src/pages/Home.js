import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Gambardepan from './../foto.jpg';
import {withCookies} from 'react-cookie';

class Home extends Component{
    constructor(props){
        super(props);
        const {cookies} = props
        this.state = {
            dtImg : [],

            id : cookies.get('id'),
            input : ''
        }
    }

    componentDidMount(){
        fetch('http://localhost:8000/gallery')
        .then(response => response.json())
        .then(res=>{
            this.setState({
                dtImg : res
            })
        })
        .catch(error=>{
            console.error(error)
        })
    }

    render(){
        return(
            <div>
                <div style={{width:'100%', height:'340px'}} className="card">    
                    <img style={{height:'340px', marginTop:'-4px'}} className="card-img-top" src={Gambardepan} alt="Card img"/>

                    <div style={{marginTop:'70px'}} className="card-img-overlay">
                        <div style={{width:'80%'}} className="card-text mx-auto">
                            <h2 style={{fontWeight:'bold'}} className="text-light">Discover collections of beautiful stock photos</h2>
                            <p style={{fontWeight:'bold'}} className="text-light">Price starting from $1 per photo</p><br />

                            <form>
                                <div className="input-group">
                                    <input type="text" placeholder="Search image" className="form-control" onChange={(ev)=> this.setState({input : ev.target.value})}/>

                                    <div className="input-group-append">
                                        <Link to ="./Gallery" className="text-white">
                                            <button type="submit" className="btn btn-primary form-control fa fa-search">
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                </div>

                <div>
                    {/* JUMLAH FOTO */}
                    <div style={{width:'100%',height:'60px'}} className="text-dark pt-2 pl-2 bg-primary">
                            <h2 className="text-light">Newly Added</h2>
                    </div>

                    {/* FOTO YANG TAMPIL */}
                    {this.state.dtImg.map((item, index)=>(
                       <div style={{width:'30%', marginLeft:'2.5%'}} className="border float-left mt-4" key={index}>
                        <Link to={`/detail/${item.id}`}>
                        <img src={'http://localhost:8000/images/' + item.image} alt="-" style={{width:'100%', height:'300px', background:'cover'}}/></Link>
    
                        <p style={{width:'50%', paddingLeft:'5%'}} className="pt-2 float-left">
                        {item.title} - ${item.price}
                        </p>
    
                            <div style={{width:'30%', textAlign:'right'}} className="float-right pt-2 pr-3">
                                <p>by <Link to ={`/sellerprofile/${item.username}`}>{item.username}</Link></p>
                                {/* <button type="button" className="float-left w-25 rounded-circle mr-2">
                                    <i className="fas fa-plus"></i>
                                </button>
                                <button type="button" className="float-left w-25 rounded-circle mr-2">
                                    <i className="fas fa-info"></i>
                                </button>
                                <button type="button" className="float-left w-25 rounded-circle">
                                    <i className="fas fa-user"></i>
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withCookies(Home);