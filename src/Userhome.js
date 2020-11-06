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
class Userhome extends Component {
    handleMen = e => {
        let path = `/userhousekeeping`
        this.props.history.push(path);
    }
    handlewomen = e => {
        let path = `/userchef`
        this.props.history.push(path);
    }
    render() {
        return (

            <div style={DivStyle}>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Logout</a>
                        </li>
                    </ul>
                </Nav>
                <div className="fcent">
                    <div className="form-group">
                        <h1 style={{ color: "white" }}> Select the services</h1>
                        <div className="login">
                            <button type="button" className="btn btn-info btn-block" onClick={this.handleMen}>Housekeeping</button>
                        </div>
                        <div className="form-group">
                            <br />
                            <button type="button" className="btn btn-info btn-block" onClick={this.handlewomen}>Chef</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Userhome
