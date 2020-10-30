import React, { Component } from 'react'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo2.jpg';

const DivStyle = {
  width: '100%',
  //height:'100%',
  height: '100vh',
  backgroundColor: "#2d6187"
}
class Shopgender extends Component {
  handleMen = e => {
    var Owner = this.props.location.state.Shop;
    // alert(Owner);
    let path = `/profhousekeeping`
    this.props.history.push(path, { Shop: Owner });
  }
  handleFemale = e => {
    var Owner = this.props.location.state.Shop;
    //  alert(Owner);
    let path = `/profchef`
    this.props.history.push(path, { Shop: Owner });
  }
  handleBack = e => {
    let Owner = this.props.location.state.Shop;
    let path = `/profmainpage`
    this.props.history.push(path, { Shop: Owner });
  }
  render() {
    return (
      <div style={DivStyle}>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          <a className="navbar-brand" href=" "><img src={logo} /></a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/profmainpage">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/proflogin">Logout</a>
            </li>
          </ul>
        </Nav>

        <div className="container">
          <div className="fcent">
            <h1>Select Specific Service</h1><br />
            <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleMen}>Housekeeping</button>
            <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleFemale}>Chef</button>
            <button type="button" className="btn btn-outline-dark btn-block" onClick={this.handleBack}>Back</button>
          </div>
        </div>
      </div>


    )
  }
}

export default Shopgender
