import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import logo from './professional-workers.jpg';
const BG = require('./homeservices.jpg');
var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage:`url(${BG})`
};

class Home extends Component {
  render() {
    return (
      <div>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" id="user" href="/user">User</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="shopowner" href="/prof">Professional</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admin" href="/adminlogin">Admin</a>
            </li>
          </ul>
        </Nav>
        <div className="container" style={ sectionStyle }> 
          {/* blue collar assist */}
          
          <section>
          
            <h1>
            <br/><br/><br/><br/>
           &nbsp; Blue Collar Assist
              {/* <span>B</span>
              <span>L</span>
              <span>U</span>
              <span>E</span>
              <br />
              <span>C</span>
              <span>O</span>
              <span>L</span>
              <span>L</span>
              <span>A</span>
              <span>R</span>
              <br />
              <span>A</span>
              <span>S</span>
              <span>S</span>
              <span>I</span>
              <span>S</span>
              <span>T</span> */}

            </h1>
          </section>
        </div>
      </div>
    )
  }
}

export default Home
