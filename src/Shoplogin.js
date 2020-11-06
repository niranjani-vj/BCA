import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from './logo2.jpg';
import axios from 'axios';

const DivStyle = {
    width: '100%',
    //height:'100%',
    height: '750px',
    backgroundColor: "#2d6187"
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
class Shoplogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: ""
            }
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            const shop = {
                email: this.state.email,
                password: this.state.password
            }
            var Owner = this.state.email;
            axios.post('http://localhost:5000/profreg/shoplogin', shop)
                .then(res => {
                    if (res.data != null) {
                        //alert('Exist');

                        this.props.history.push('/profmainpage', { Shop: Owner });
                    }
                    else {
                        alert("Wrong Login Id.. ");
                    }
                })
        }

    }
    handlChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'email':
                formErrors.email = emailRegex.test(value) ? "" : "Invalid Email-id";
                break;
            case 'password':
                formErrors.password = value.length < 3 ? "Minimum 3 characters are required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }
    render() {
        const { formErrors } = this.state;
        return (
            <div style={DivStyle}>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/profreg">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                    </ul>
                </Nav>


                <div className="container">
                    <div className="cent">


                        <form onSubmit={this.handleSubmit} noValidate class="ext-center border border-light p-5">
                            <h1 style={{ textAlign: "center", fontFamily: "Western" }}>Login Form</h1>
                            <div className="form-group" >
                                <input type="email" className="form-control" name="email" placeholder="Email" noValidate onChange={this.handlChange} />
                                {formErrors.email.length < 0 && (<span className="errormessage">{formErrors.email}</span>)}
                            </div>
                            <div className="form-group" >
                                <input type="password" className="form-control" name="password" placeholder="Password" noValidate onChange={this.handlChange} />
                                {formErrors.password.length < 0 && (<span className="errormessage">{formErrors.password}</span>)}
                            </div>
                            <div className="form-group" >
                                {/* <button type="submit" className="btn btn-outline-primary btn-block">Login</button><br/> */}
                                <Button variant="primary" type="submit">
                                    Submit
                         </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <Button variant="danger" type="reset">
                                    Reset
                            </Button>
                                {/* <button type="reset" className="btn btn-outline-danger btn-block">Reset</button> */}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Shoplogin
