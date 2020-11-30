import React, { Component } from 'react'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo2.jpg';

const DivStyle = {
  width: '100%',
  //height:'100%',
  height: '100vh',
  backgroundColor: "#2d6187"
}
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
class ShopMainPage extends Component {
  handleAddDiscount = e => {
    var Owner =localStorage.getItem("owner");
    //  alert(Owner);
    let path = `/addprof`
    this.props.history.push(path, { Shop: Owner });
  }
  handleView = e => {
    var Owner = localStorage.getItem("owner")
    // alert(Owner);
    let path = `/profview`
    this.props.history.push(path, { Shop: Owner });
  }

  handleBookings = e =>{
    var Owner = localStorage.getItem("owner")
    // alert(Owner);
    let path = `/profbookings`
    this.props.history.push(path, { Shop: Owner });

  }
  render() {
    let owner = localStorage.getItem("owner")
    let name = owner.split('@gmail.com')
    return (
      <div style={DivStyle}>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
          <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" href="/profmainpage">Welcome {capitalize(name.toString())}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/profbookings' >User's Bookings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/proflogin">Logout</a>
            </li>
            {/* <pre classN> 
           
            <li  className="nav-item">
              <a className="nav-link" href="/proflogin">Notify</a>
            </li>
            </pre> */}
          </ul>
        </Nav>
        <br /><br></br>
        <div className="fcent">
        <div className="form-group">
                        <h1 style={{ color: "white" }}> Select the services</h1>
                        <div className="login">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleAddDiscount}>Add Services</button>
          </div><br></br>
          <div className="form-group">
          <button type="button" className="btn btn-secondary btn-block" onClick={this.handleView}>View Services</button>
          </div>
        </div>
        </div>
        </div>
      
    )
  }
}
export default ShopMainPage
