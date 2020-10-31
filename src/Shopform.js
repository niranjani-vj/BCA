import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import logo from './logo2.jpg';
//import {useHistory} from 'react-router-dom';
import axios from 'axios';
var lat, lng;
const gstregx = RegExp('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')
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
class Shopform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            // shopname: null,
            // gstno: null,
            phono: null,
            email: null,
            password: null,
            formErrors: {
                name: "",
                // shopname: "",
                // gstno: "",
                phono: "",
                email: "",
                password: ""
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            const shop = {
                name: this.state.name,
                // shopname: this.state.shopname,
                // gstno: this.state.gstno,
                phono: this.state.phono,
                email: this.state.email,
                password: this.state.password,
                // lat,
                // lng
            }
            console.log(shop);
            axios.post('http://localhost:5000/shopsreg/add', shop)
                .then(res => console.log(res.data));
            // console.log(`Submited valid form`);

            let path = `/proflogin`
            this.props.history.push(path);
        }
        else {
            console.log('Invalid form');
            alert('Invalid form');
            let path = `/profReg`
            this.props.history.push(path);
        }
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name = value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            // case "shopname":
            //     formErrors.shopname = value.length < 3 ? "Minimum of 3 characters required" : "";
            //     break;
            // case "gstno":
            //     formErrors.gstno = gstregx.test(value) ? "" : "Invalid GST Number";
            //     break;;
            case "phono":
                formErrors.phono = value.length === 10 && value === Number ? "Invalid Phone Number" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "Invalid Email-id";
                break;
            case "password":
                formErrors.password = value.length < 3 ? "Minimum  3 characters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    handleClick = e => {
        navigator.geolocation.watchPosition(getposition);
        function getposition(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        }
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    <a className="navbar-brand" href=" "><img src={logo} /></a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/proflogin">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                    </ul>
                </Nav>
                <div className="fcent">
                    <div className="form-group">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <h1>Professional Registration Form</h1>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name" name="name" noValidate onChange={this.handleChange} />
                                {formErrors.name.length > 0 && (<span className="errormessage">{formErrors.name}</span>)}
                            </div>
                            {/* <div className="form-group">
                    <input type="text" className="form-control" placeholder="Professional Name" name="shopname" noValidate onChange={this.handleChange} />
                    {formErrors.shopname.length>0 && (<span className="errormessage">{formErrors.shopname}</span>)}
                    </div> */}
                            {/* <div className="form-group">
                        <input type="text" className="form-control" placeholder="GST Number" name="gstno" noValidate onChange={this.handleChange}/>
                        {formErrors.gstno.length>0 && (<span className="errormessage">{formErrors.gstno}</span>)}
                    </div> */}

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone Number" name="phono" noValidate onChange={this.handleChange} />
                                {formErrors.phono.length > 0 && (<span className="errormessage">{formErrors.phono}</span>)}
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" name="email" noValidate onChange={this.handleChange} />
                                {formErrors.email.length > 0 && (<span className="errormessage">{formErrors.email}</span>)}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" name="password" noValidate onChange={this.handleChange} />
                                {formErrors.password.length > 0 && (<span className="errormessage">{formErrors.password}</span>)}
                            </div>
                            {/* <div className="form-group">
                        <button type="button"  className="btn btn-outline-secondary btn-block" onClick={this.handleClick}>Location</button>
                    </div> */}
                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-info btn-block">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
export default Shopform
