import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
//import {getCurrentDate} from './utils';
import axios from 'axios';
const DivStyle = {
    //width:'100%',
    //height:'100%',
    height: '750px',
    backgroundColor: "#2d6187"
}
class AdminLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
        }
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }
    handleSubmit = e => {
        e.preventDefault();
        //  const adm ={
        //      email:this.state.email,
        //      password:this.state.password
        //  }
        const params = new URLSearchParams();
        params.append('email', this.state.email);
        params.append('password', this.state.password);
        axios({
            method: 'post',
            url: 'http://localhost:5000/admin/check',
            data: params
        })
            .then(res => {
                let ad = res.data;
                console.log(ad.length);
                if (ad.length !== 0) {
                    this.props.history.push('/adminhome');
                }
                else {
                    alert("Wrong login id");
                }
            });
        // 
    }

    render() {
        return (
            <div style={DivStyle}>
            <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/profreg">Register</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/adminreg">Register</a>
                        </li>
                    </ul>
                </Nav>
                <div className="container">
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" placeholder="Email-id" className="form-control" name="email" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control" name="password" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-outline-primary btn-block">Login</button>
                            <button type="reset" className="btn btn-outline-danger btn-block">Reset</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default AdminLogin
