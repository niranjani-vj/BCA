import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
// import logo from './logo2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
const PhonePattern=RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}")
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
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      userphno: null,
      useremailid: null,
      userpassword: null,
      formErrors: {
        username: "",
        userphno: "",
        useremailid: "",
        userpassword: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state) && navigator.geolocation) {
      const user = {
        username: this.state.username,
        useremailid: this.state.useremailid,
        userphno: this.state.userphno,
        userpassword: this.state.userpassword
      }
      // alert(typeof(user))
      console.log(user);
      axios.post('http://localhost:5000/usersreg/add', user)
        .then(res => console.log(res.data));
      let path = `/login`
      this.props.history.push(path);

    }
    else {
      alert("Form is invalid! ");
      console.log('Form is invalid')
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "username":
        formErrors.username = value.length < 3 ? "Minimun 3 characters required" : "";
        break;
      case "userphno":
        formErrors.userphno = value.length === 10 && value === Number ? "Only 10 Numbers required" : "";
        break;
      case "useremailid":
        formErrors.useremailid = emailRegex.test(value) ? "" : "invalid email";
        break;
      case "userpassword":
        formErrors.userpassword = value.length < 3 ? "Minimun 3 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

  };
  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          {/* <a className="navbar-brand" href=" "><img src={logo} /></a> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/home">Home</a>
            </li>
          </ul>
        </Nav>
        <div className="fcent">
          <div className="form-group">
            <h1> Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="form-group">
                <input type="text" id="un" className="form-control" placeholder="First Name" name="username" noValidate onChange={this.handleChange} />
                {formErrors.username.length > 0 && (<span id="uen" className="errormessage">{formErrors.username}</span>)}
              </div>
              <div className="form-group">
                <input type="text" id="uph" className="form-control" placeholder="Phone number" name="userphno" noValidate onChange={this.handleChange} />
                {formErrors.userphno.length > 10 && (<span className="errormessage">{formErrors.userphno}</span>)}
              </div>
              <div className="form-group">
                <input type="email" id="uemail" className="form-control" placeholder="Email" name="useremailid" noValidate onChange={this.handleChange} />
                {formErrors.useremailid.length < 0 && (<span className="errormessage">{formErrors.useremailid}</span>)}
              </div>
              <div className="form-group">
                <input type="password" id="upass" className="form-control" placeholder="Password" name="userpassword" noValidate onChange={this.handleChange} />
                {formErrors.userpassword.length > 0 && (<span className="errormessage">{formErrors.userpassword}</span>)}
              </div>
              <div className="form-group">
                <button type="submit" id="usub" className="btn btn-outline-primary btn-block" onClick={this.handlClick}> Create Account</button>
                <button type="reset" id="upass" className="btn btn-outline-warning btn-block" >Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Form
