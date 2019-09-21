import React, {Component} from 'react';
import {withCookies} from 'react-cookie';

class EditProduct extends Component{
    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
          accepted: [],
          rejected: [],

          id : this.props.match.params.id,
          image : '',
          title : '',
          price : '',
          desc : '',
          username : cookies.get('id')
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8000/detail/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(res=>{
            this.setState({
                image : res[0].image,
                title : res[0].title,
                price : res[0].price,
                desc : res[0].desc
            })
            console.log(this.state.title)
        })
        .catch(error=>{
            console.error(error)
        })
    }

    handleChange(event){
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    editProduct(){
        const {history} = this.props
        var data = new FormData();
        data.append('title', this.state.title)
        data.append('price', this.state.price)
        data.append('desc', this.state.desc)
        fetch(
            `http://localhost:8000/detail/${this.state.id}`,
            {
                method : 'PUT',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json',},
                body: JSON.stringify(this.state)
            }
        )
        .then(response=>response.json())
        .then(res=>{
            console.log(res);
            alert('Data gallery berhasil diubah')
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
                    <h4 className="font-weight-bold text-left m-4 text-dark">Edit Product</h4>
                    <hr/>

                    <img src={'http://localhost:8000/images/'+ this.state.image} alt='' style={{width:'50%'}} className="p-5 float-left"/>
                    
                    
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
                            <button className="btn btn-primary" type="button" onClick={this.editProduct.bind(this)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(EditProduct)