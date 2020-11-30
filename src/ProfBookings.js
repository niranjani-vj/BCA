import React, { Component } from 'react'
import './App.css';
import { Nav } from 'react-bootstrap';
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
class ProfBookings extends Component {
    handleMen = e => {
        let owner = localStorage.getItem("owner")
        let path = `/profbookinghk`
        this.props.history.push(path,owner);
    }
    handlewomen = e => {
        let path = `/profbookingchef`
        this.props.history.push(path);
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
                        <a className="nav-link" href="/profbookings">User's Bookings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/proflogin">Logout</a>
                        </li>
                    </ul>
                </Nav>
                <div className="fcent">
                    <div className="form-group">
                        <h2 style={{ color: "white" }}> Select the services to view bookings </h2><br></br>
                        <div className="login">
                            <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleMen}>Housekeeping</button>
                        </div>
                        <div className="form-group">
                            <br />
                            <button type="button" className="btn btn-outline-info btn-block" onClick={this.handlewomen}>Chef</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfBookings
