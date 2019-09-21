import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {withCookies} from 'react-cookie';

class Gallery extends Component{
    constructor(){
        super();
        this.state = {
            dtImg : [],
            newDtImg : [],
            countRow : null,
            input : ''
        }
    }

    componentDidMount(){
        if (this.state.input === ''){
            fetch('http://localhost:8000/gallery')
        .then(response => response.json())
        .then(res=>{
            this.setState({
                dtImg : res,
                countRow : res.length
            })
        })
        .catch(error=>{
            console.error(error)
        })
        }
    }

    searchButton(){
        axios.get('http://localhost:8000/gallery/' + this.state.input)
        .then(res=>{
            console.log(res)
            this.setState({
                dtImg : res.data,
                countRow : res.data.length
            })
            console.log(this.state.dtImg)
        })
        .catch(error=>{
            console.error(error)
        })
    }


    render(){
        // const {cookies} = this.props

        // function AddProductButton(props){
        //     if (cookies.get('token')){
        //     return <div style={{width:'30%', height:'305px', marginLeft:'2.5%'}} className="border float-left mt-4">
        //         <div style={{paddingTop:'135px'}} className="text-center">
        //             <Link to='/addprod'><button type="button" className="rounded-circle"><i className="fa fa-plus"></i></button></Link>
        //             <p>Add Product</p>
        //         </div>
        //     </div>}
        //     return <p></p>
        // }
        return(
            <div className="container-fluid p-0">
                {/* SEARCH ENGINE DAN FILTER */}
                <div style={{width:'100%',height:'100px'}}>
                    {/* SEARCH ENGINE */}
                    <div style={{width:'60%',height:'100px'}} className="float-left">
                        <div style={{width:'80%',height:'50px',marginTop:'30px'}} className="ml-3">

                            <div className="input-group">
                                <input type="text" className="input-group-text form-control" placeholder="Search image" style={{width:'80%',height:'40px'}} name="input" onChange={(ev)=> this.setState({input : ev.target.value})} />
                                <div className="input-group-append">
                                <button className="btn btn-primary fa fa-search" type="submit" onClick={this.searchButton.bind(this)}></button>
                                </div>
                            </div>               

                        </div>
                    </div>

                    {/* FILTER */}
                    {/* <div className="bg-light float-left" style={{width:'70%',height:'200px'}} >
                        <div style={{width:'95%',height:'150px'}} className="mx-auto mt-4 ml-5 mr-5"> */}
                            {/* JUDUL */}
                            {/* <div style={{width:'100%',height:'40px'}} className="text-dark">
                                <h3>Filter</h3>
                                <hr/>
                            </div> */}

                            {/* JENIS FILTER */}
                            {/* <div style={{width:'100%',height:'110px',position:'relative'}} className="pt-2"><br/> */}
                                {/* FORMAT */}
                                {/* <div style={{width:'30%', height:'90px',marginLeft:'2.5%'}} className="float-left">
                                    <span className="font-weight-bold small">FORMAT</span>
                                    <div className="form-check"> 
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check1" name="checkboxopt"/>JPEG
                                        </label>
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check2" name="checkboxopt"/>PNG
                                        </label>
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" value="check1" name="checkboxopt"/>GIF
                                        </label>
                                    </div>
                                </div> */}
                                
                                {/* SIZE */}
                                {/* <div style={{width:'30%', height:'90px',marginLeft:'2.5%'}} className="float-left">
                                    <span className="font-weight-bold small">SIZE</span>
                                    <div className="form-check">
                                        <label className="form-check-label mr-4">
                                            <input type="checkbox" className="form-check-input" value="check1" name="checkboxopt"/>High
                                    </label>
                                    <label className="form-check-label mr-4">
                                        <input type="checkbox" className="form-check-input" value="check2" name="checkboxopt"/>Medium
                                    </label>
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" value="check1" name="checkboxopt"/>Low
                                    </label>
                                    <br/>
                                </div>
                                </div> */}

                                {/* PRICE */}
                                {/* <div style={{width:'30%', height:'90px',marginLeft:'2.5%'}} className="float-left">

                                    <span className="font-weight-bold small">PRICE</span>
                                    <div className="form-check">
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check1" name="checkboxopt"/>$1
                                        </label>
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check2" name="checkboxopt"/>$2
                                        </label>
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check3" name="checkboxopt"/>$3
                                        </label>
                                        <label className="form-check-label mr-5">
                                            <input type="checkbox" className="form-check-input" value="check4" name="checkboxopt"/>$4
                                        </label>
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" value="check5" name="checkboxopt"/>$5
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* JUMLAH FOTO */}
                <div style={{width:'100%',height:'60px'}} className="bg-primary text-white pt-3 pl-3">
                    <div>
                        <h5>{this.state.countRow} results</h5>
                    </div>
                </div>

                {/* <AddProductButton/> */}

                {/* FOTO YANG TAMPIL */}
                <div>
                    {this.state.dtImg.map((item, index)=>(
                        <div style={{width:'30%', marginLeft:'2.5%'}} className="border float-left mt-4" key={index}>
                        <Link to={`/detail/${item.id}`}>
                        <img src={'http://localhost:8000/images/' + item.image} alt="-" style={{width:'100%', height:'300px', background:'cover'}}/></Link>
    
                        <p style={{width:'50%', paddingLeft:'5%'}} className="pt-2 float-left">
                        {item.title} - ${item.price}
                        </p>
    
                            {/* <div style={{width:'50%'}} className="float-right pt-2 pl-5">
                                <button type="button" className="float-left w-25 rounded-circle mr-2">
                                    <i className="fas fa-plus"></i>
                                </button>
                                <button type="button" className="float-left w-25 rounded-circle mr-2">
                                    <i className="fas fa-info"></i>
                                </button>
                                <button type="button" className="float-left w-25 rounded-circle">
                                    <i className="fas fa-user"></i>
                                </button>
                            </div> */}
                             <div style={{width:'30%', textAlign:'right'}} className="float-right pt-2 pr-3">
                                <p>by <Link to ={`/sellerprofile/${item.username}`}>{item.username}</Link></p>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        );
    }
}

export default withCookies(Gallery)