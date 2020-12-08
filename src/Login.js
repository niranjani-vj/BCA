import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import logo from './logo2.jpg';
//const BG = require('./users.jpg');

const DivStyle = {
    //width:'100%',
    //height:'100%',
    height: '750px',
    //backgroundImage:`url(${BG})`
}
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val == null && (valid = false)
    });
    return valid;
};
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            useremailid: null,
            userpassword: null,
            formErrors: {
                userpassword: "",
                useremailid: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            const user = {
                useremailid: this.state.useremailid,
                userpassword: this.state.userpassword
            }
            var userID = this.state.useremailid;
            console.log(userID)
            axios.post('http://localhost:5000/usersreg/login', user)
                .then(res => {
                    console.log(res.data)
                    if (res.data != null) {
                        localStorage.setItem("Useremail",userID)
                        this.props.history.push('/userhome')
                    }
                    else {
                        alert("Wrong Login Id.. ");
                        this.props.history.push('/userReg')
                    }
                })

        }
        else {
            console.log('Invalid entry')
        }

    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "useremailid":
                formErrors.useremailid = emailRegex.test(value) ? "" : "invalid email";
                break;
            case "userpassword":
                formErrors.userpassword = value.length < 3 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/userreg">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                    </ul>
                </Nav>
                <div style={DivStyle}>

                    <div className="container">
                        <div className="cent">
                            <h1>Login Form</h1>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="useremailid" id="username" placeholder="Email" onChange={this.handleChange} />
                                    {formErrors.useremailid.length < 0 && (<span className="errormessage">{formErrors.useremailid}</span>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="userpassword" name="userpassword" placeholder="Password" onChange={this.handleChange} />
                                    {formErrors.userpassword.length < 0 && (<span className="errormessage">{formErrors.userpassword}</span>)}
                                </div>
                                <div >
                                    <button type="submit" id="submit" className="btn btn-primary btn-block">Login</button>
                                    <button type="reset" id="reset" className="btn btn-danger btn-block">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
