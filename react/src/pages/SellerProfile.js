import React, { Component } from "react";
import {withCookies} from 'react-cookie';
import profileImage from './../picture/profile.png';
import {Link} from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
    // const {cookies} = props
    this.state={
      userData : [],
      imgData : [],

      username : this.props.match.params.username

    }
  }

  componentDidMount(){
    // const {cookies} = this.props
    // const {id} = cookies.get("id")
    fetch(`http://localhost:8000/profile/${this.state.username}`)
    .then(response => response.json())
    .then(res => {
      this.setState({userData : res })
    })
    .catch(err=>{
      console.log(err)
  })

    fetch(`http://localhost:8000/profile/${this.state.username}/gallery`)
    .then(response => response.json())
    .then(res => {
      this.setState({imgData : res})
    })
    .catch(err=>{
      console.log(err)
  })
  }

  deletePhoto(id){
    fetch(`http://localhost:8000/gallery/${id}`,{
      method: 'DELETE',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json',}
      }).then((response => response.json()))
      .then(res=>{this.componentDidMount()})
  }

  render() {
    return (
      <div className="mx-0">
           {this.state.userData.map((item, index)=>(
             <div key={index} className="container border mt-4 pt-4 w-100 bg-light" style={{height:'100%'}}>
              <div style={{width:'180px', height:'180px', margin:'auto', paddingLeft:'15px', paddingTop:'15px'}} className="bg-white border">
              <img src={profileImage} alt="profileImage" style={{width:'150px'}} /></div>
              <h1 style={{ textAlign: "center", color: "black", fontSize: "25px" }}>{item.username}'s Profile</h1>
              <hr/>
              <div className="mx-auto">
                <table style={{textAlign: "left", fontSize: "20px", margin:'auto'}}>
                  <tbody>
                  <tr>
                    <td> First Name </td>
                    <td> </td> 
                    <td> : </td>
                    <td>{item.firstname} </td>
                  </tr>
                  <tr>
                    <td> Last Name </td>
                    <td> </td> 
                    <td> : </td>
                    <td> {item.lastname}</td>
                  </tr>
                  {/* <tr>
                    <td> Email </td>
                    <td> </td> 
                    <td> : </td>
                    <td> - </td>
                  </tr> */}
                  </tbody>
                </table>
                <br />
              </div>
             </div>
           ))}
           <div style={{width:'100%',height:'60px'}} className="text-dark pt-2 pl-2 bg-primary mt-4">
           <h3 className="text-light">{this.state.username}'s Gallery</h3>
           </div>

          {this.state.imgData.map((item, index)=>(
          <div style={{width:'30%', marginLeft:'2.5%'}} className="border float-left mt-4" key={index}>
            <Link to={`/detail/${item.id}`}>
            <img src={'http://localhost:8000/images/' + item.image} alt="-" style={{width:'100%', height:'300px', background:'cover'}}/></Link>

            <p style={{width:'50%', paddingLeft:'5%'}} className="pt-2 float-left">
            {item.title} - ${item.price}
            </p>
          </div>
          ))}   
      </div>
    );
  }
}

export default withCookies(Profile)