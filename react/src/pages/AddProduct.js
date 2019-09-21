import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from 'react-cookie';

class AddProduct extends Component{
    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
          accepted: [],
          rejected: [],

          image : null,
          title : '',
          price : '',
          desc : '',
          username : cookies.get('id')
        }
    }

    handleChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    getFiles(ev){
        this.setState({
            image : ev.target.files[0]
        })
    }

    saveGallery(){
        const {history} = this.props
        var data = new FormData();
        data.append('fileImage', this.state.image)
        data.append('title', this.state.title)
        data.append('price', this.state.price)
        data.append('desc', this.state.desc)
        data.append('username', this.state.username)
        fetch(
            'http://localhost:8000/gallery',
            {
                method : 'POST',
                body : data
            }
        )
        .then(response=>response.json())
        .then(res=>{
            console.log(res);
            alert('Data gallery berhasil disimpan')
            history.push('/gallery')
        })
        .catch(error=>{
            alert('Data gallery gagal disimpan')
        })
    }

    render(){
        return(
            <div className="container-fluid p-0">
                {/* KOTAK FORM */}
                <div style={{width:'65%'}} className="container pt-5 mx-auto">
                    <h4 className="font-weight-bold text-left m-4 text-dark">Add New Image</h4>
                    <hr/>

                     {/* DROPZONE */}
                    <div style={{width:'50%'}} className="p-5 float-left">
                        <section>
                            <div className="dropzone">
                                <Dropzone style={{height:'300px',paddingTop:'100px'}} className="text-center border border-dark rounded pl-5 pr-5"  accept="image/*" onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }} onChange={this.getFiles.bind(this)}>
                                <p>Drop files here, or click to select files to upload.</p>
                                <p>Only *.jpeg and *.png images will be accepted</p>
                                </Dropzone>
                                <br/>
                                <aside>
                                    <p className="mx-auto p-0">Accepted files :
                                        {this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
                                    </p>
                                </aside>
                
                            </div>
                        </section>
                    </div>
                    
                    
                    <div style={{width:'50%'}} className="p-5 float-left">
                        {/* TITLE */}
                        <div className="mb-3">
                            <label className="form-check-label font-weight-bold" htmlFor="title">TITLE : &nbsp; </label>
                            <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                        </div>

                        {/* PRICE */}
                        <div className="mb-3">
                            <label className="form-check-label font-weight-bold" htmlFor="price">PRICE : &nbsp; </label>
                            <input type="number" className="form-control" placeholder="$" id="price" value={this.state.price} onChange={this.handleChange.bind(this)} />
                        </div>

                        {/* DESCRIPTION center*/}
                        <div className="mb-3">
                            <label className="font-weight-bold" htmlFor="desc" >DESCRIPTION : &nbsp;</label>
                            <textarea className="form-control" id ="desc" value={this.state.desc} onChange={this.handleChange.bind(this)} />
                        </div>

                        {/* SUBMIT */}
                        <div className="mb-3">
                            <button className="btn btn-primary" type="button" onClick={this.saveGallery.bind(this)}>UPLOAD</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(AddProduct)