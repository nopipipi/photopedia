import React, {Component} from 'react';
import {withCookies} from 'react-cookie';

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.params.id,
            dataImage : []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8000/detail/${this.state.id}`)
        .then(response => response.json())
        .then(res=>{
            this.setState({
                dataImage : res
            })
            console.log(res)
        })
        .catch(error=>{
            console.error(error)
        })
    }

    render(){
        return(
            <div className="mt-5">
                {this.state.dataImage.map((item, index)=>(
                    <div className="container border pt-5 pb-5 pl-5 w-100 bg-light" style={{height:'100%'}} key={index}>
                        <img src={'http://localhost:8000/images/' + item.image} alt='' style={{width:'50%'}} />
                        <div style={{width:'45%', marginLeft:'5%'}} className="float-right">
                        <h3>{item.title}</h3>
                        <h5>by {item.username}</h5>
                        <p>Price : ${item.price}</p>
                        <hr />
                        <h5>Photo's Description :</h5>
                        <p>{item.desc}</p>
                        <br />
                        <button className='btn btn-primary'>Buy Now</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default withCookies(Detail)