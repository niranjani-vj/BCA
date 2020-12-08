import React, { Component } from 'react'
import { Nav } from 'react-bootstrap';
import logo from './logo2.jpg';
import './App.css'
const BG = require('./professional-workers.jpg');
const DivStyle = {
  width: '100%',
  //height:'100%',
  height: '100vh',
  backgroundImage:`url(${BG})`
};
class ShopDisView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      da: '',
      Owner: this.props.location.state.Shop,
      fdis: [],
      mdis: [],
      id: null
    }
  }
  handleMen = e => {
    var Owner = this.props.location.state.Shop;
    // alert(Owner);
    let path = `/housekeepingview`
    this.props.history.push(path, { Shop: Owner });
  }

  handleFemale = e => {
    var Owner = this.props.location.state.Shop;
    // alert(Owner);
    let path = `/chefview`
    this.props.history.push(path, { Shop: Owner });

  }
  handleBack = e => {
    var Owner = this.props.location.state.Shop;
    let path = `/profmainpage`
    this.props.history.push(path, { Shop: Owner });
  }

  render() {

    return (
      <div style={DivStyle}>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/profmainpage">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/proflogin">Logout</a>
            </li>
          </ul>
        </Nav>
        <div class="fcent">
          <div class="form-wrapper"><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Select specific service to view</h1>
            <div className="login">
              <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleMen}>Housekeeping</button>
            </div>
            <div className="login">
              
              <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleFemale}>Chef</button>
            </div>
            <div>
              <button type="button" className="btn btn-outline-dark btn-block" onClick={this.handleBack}>Back</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ShopDisView
