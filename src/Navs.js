import React, { Component } from 'react'
import './App.css';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo2.jpg';
const BG = require('./professional-workers.jpg');
var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage:`url(${BG})`
};
 class Navs extends Component {
    render() {
        return (
            <div>
          <Nav className="navbar navbar-expand-sm bg-info navbar-light">
             {/* <a className="navbar-brand" href=" "><img src={logo}/></a> */}
             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" id="shoplogin" href="/proflogin">Login</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" id="shopreg" href="/profReg">Register</a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" id="home" href="/home">Home</a>
               </li>
             </ul>
           </Nav>
      <div className="wrapper" >
      <section style={ sectionStyle }>
        <h1>
        <br/><br/><br/><br/><br/>
        Welcome To Blue Collar Assist
          {/* <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
           <br/>
           <span>T</span>
           <span>O</span>
           <br/>
           <span>B</span>
          <span>L</span>
          <span>U</span>
          <span>E</span>
          &nbsp;
          <span>C</span>
          <span>O</span>
          <span>L</span>
          <span>L</span>
          <span>A</span>
          <span>R</span>
          <br/>
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

export default Navs
