import React, { Component } from 'react'
import axios from 'axios';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Table from 'react-bootstrap/Table';
import emailjs from 'emailjs-com'
const mailer = require("nodemailer")
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const config = require("../src/Paytm/config.js")
const checksum_lib = require("../src/Paytm/checksum.js")
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
var category
const DivStyle = {
    //width:'100%',
    //height:'100%',
    height: '750px',
    color: '#FFF',
    backgroundColor: "#2d6187"
}
class BookHousekeeping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            from: null,
            to: null,
            time: null,
            formErrors: {

            }

        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            //     case "name":
            //         formErrors.name = value.length < 3 ? "Minimum 3 characters required" : "";
            //         break;
            //     // case "shopname":
            //     //     formErrors.shopname = value.length < 3 ? "Minimum of 3 characters required" : "";
            //     //     break;
            //     // case "gstno":
            //     //     formErrors.gstno = gstregx.test(value) ? "" : "Invalid GST Number";
            //     //     break;;
            //     case "phono":
            //         formErrors.phono = value.length === 10 && value === Number ? "Invalid Phone Number" : "";
            //         break;
            //     case "email":
            //         formErrors.email = emailRegex.test(value) ? "" : "Invalid Email-id";
            //         break;
            //     case "password":
            //         formErrors.password = value.length < 6 ? "Minimum  6 characters required" : "";
            //         break;
            case "from":
                let date = value;
                console.log(`${year}${sep}${month}${sep}${da}`)
                if (this.state.from <= `${year}${sep}${month}${sep}${da}`) {
                    alert('Invalid date');
                    date = "";
                }
                break;
            case "to":
                let to = value;
                if (to <= `${year}${sep}${month}${sep}${da}` || this.state.from > to) {
                    alert('Invalid date');
                    to = "";
                }
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }


    handleClick = e => {
        e.preventDefault();

        console.log(category)
        const categories = {
            category
        }

        const details = {
            book_id: this.props.location.state.bookID,
            Owner: this.props.location.state.Owner,
            category: this.props.location.state.category,
            price: this.props.location.state.price,
        }
        console.log(details)
        axios.post('http://localhost:5000/profhousekeeping/book', details)
        //  .then(res=>console.log("Details: ",res.data));
        //  .then(res => {
        //     const dis = res.data;
        //     this.setState({ dis })
        //     console.log({dis})
        // })

        // const params = new URLSearchParams();
        // params.append('bookID',book_id);
        // params.append('lat', Number(lat));
        // params.append('lng', Number(lng));
        // let a = window.confirm("CLick yes....")
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:5000/profhousekeeping/book',
        //     data: params
        // })
        //     .then(res => {
        //         const dis = res.data;
        //         this.setState({ dis })
        //         return (
        //            


        //         )

        //     })
    }

    handleSubmit = e => {
        e.preventDefault();
        var Owner = this.props.location.state.Owner;
        const params = new URLSearchParams();
        params.append('email', Owner);
        axios({
            method: 'post',
            url: 'http://localhost:5000/profreg/det',
            data: params
        })
            .then(res => {
                let sd = res.data;
                console.log(sd[0]['phono']);
                const phono = sd[0]['phono'];
                // const lat = sd[0]['location']['lat'];
                // const lng = sd[0]['location']['lng'];
                //   this.setState({ phono });
                // this.setState({ lat });
                // this.setState({ lng });

            });
        console.log(this.state)
        //  alert(Owner);
        const disf = {
            Owner,
            user: localStorage.getItem("Useremail"),
            // phono:this.state.phono,
            category: this.props.location.state.category,
            price: this.props.location.state.price,
            from: this.state.from,
            to: this.state.to,
            time: this.state.time
        }
        if (formValid(this.state)) {
            // alert(this.state.shopname);
            console.log(disf);
            // this.sendEmail()
            console.log('Form is valid');
            axios.post('http://localhost:5000/book_hk/add', disf)
                .then(res => console.log(res.data));

            alert("Booked!")

            //this.sendEmail(Owner,disf.user,disf.category)
            this.props.history.push(`/userhome`)
        }
        else {
            alert("Form is invalid")
        }

    }

    onSubmit = e => {
        e.preventDefault();
        var Owner = this.props.location.state.Owner;
        const params = new URLSearchParams();
        params.append('email', Owner);
        axios({
            method: 'post',
            url: 'http://localhost:5000/profreg/det',
            data: params
        })
            .then(res => {
                let sd = res.data;
                console.log(sd[0]['phono']);
                const phono = sd[0]['phono'];
                // const lat = sd[0]['location']['lat'];
                // const lng = sd[0]['location']['lng'];
                //   this.setState({ phono });
                // this.setState({ lat });
                // this.setState({ lng });

            });
        console.log(this.state)
        //  alert(Owner);
        const disf = {
            Owner,
            user: localStorage.getItem("Useremail"),
            // phono:this.state.phono,
            category: this.props.location.state.category,
            price: this.props.location.state.price,
            from: this.state.from,
            to: this.state.to,
            time: this.state.time
        }
        if (formValid(this.state)) {
            // alert(this.state.shopname);
            console.log(disf);
            // this.sendEmail()
            console.log('Form is valid');
            axios.post('http://localhost:5000/book_hk/add', disf)
                .then(res => console.log(res.data));

            // alert("Booked!")

            //this.sendEmail(Owner,disf.user,disf.category)
            this.props.history.push(`/payment`)
        }
        else {
            alert("Form is invalid")
        }

    }




    // sendEmail(e){
    //     e.preventDefault();
    //    const { name, value } = e.target;
    //     emailjs.sendForm('gmail', 'template_i13cjd6', e.target, 'user_8i7yhXUu1ABzUMOs1liPN')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
    // }

    // sendEmail = (to,name,type) => {
    //     const smtpTransport = mailer.createTransport({

    //         service : "Gmail",
    //         auth:{
    //             user: "sudharanjani.16@gmail.com",
    //             pass: "ilikefriendz"
    //         }
    //     })

    //     const mail = this.sendEmail(to, name, type)

    //     smtpTransport.sendMail(mail,function(err,res){
    //         if(err){
    //             console.log("error")
    //         }else{
    //             console.log("Email sent successfully!")
    //         }
    //         smtpTransport.close();
    //     })
    // }


    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/userhousekeeping`)
    }
    renderTable = e => {
        return this.state.dis.map(bk => {
            const { Owner, category, price } = bk;
            return (
                // <label for="male">{Owner}</label>
                <input type="text" />
            )
        })
    }

    render() {
        let userID = localStorage.getItem("Useremail")
        console.log(userID)
        return (
            <div style={DivStyle}>

                <div className="container">
                    <div className="cent">
                        {/* <button type="button" className="btn btn-info" onClick={this.handleClick}>Click Me to View</button> */}
                        {/* <button type="button" className="btn btn-warning" onClick={this.handleloc}>Location🧿</button> */}
                    </div><br></br>
                    <h2 style={{ textAlign: "center" }}>Booking!</h2>


                    <form>

                        <div>
                            <span className="form-group">Email:</span>
                            <input type="email" className="form-control" name="owneremailid" value={localStorage.getItem("owner")} disabled='true' id="username" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <span className="form-group">Services:</span>
                            <input type="text" className="form-control" name="category" value={this.props.location.state.category} disabled='true' id="username" placeholder="category" />
                        </div>
                        <div className="form-group">
                            <span className="form-group">Price:</span>
                            <input type="text" className="form-control" name="price" value={this.props.location.state.price} disabled='true' id="username" placeholder="price" onChange={this.handleChange} />
                        </div>

                        <div>
                            <span className="form-group">From:</span>
                            <input type="date" name="from" className="form-control" onChange={this.handleChange} />
                        </div>
                        <div>
                            <span className="form-group">To:</span>
                            <input type="date" name="to" className="form-control" onChange={this.handleChange} />
                        </div>
                        <div>
                            <span className="form-group">Select time slots:</span>
                            <select name="time" className="form-control btn-outline-info" noValidate onChange={this.handleChange}>
                                <option value="">T-I-M-E</option>
                                <option value="9:00-10:00 AM">9:00-10:00 AM</option>
                                <option value="10:00-11:00 AM">10:00-11:00 AM</option>
                                <option value="1:00-3:00 PM">1:00-3:00 PM</option>
                                <option value="3:00-4:00 PM">3:00-4:00 PM</option>
                                <option value="4:00-5:00 PM">4:00-5:00 PM</option>

                            </select>
                        </div>
                        <div>
                            <br></br>

                        </div>
                        <div className="form-group">
                            <br />
                            <button type="submit" className="btn btn-primary " onClick={this.handleSubmit}>Cash on Services (COS)</button> &nbsp;
                        <button type="submit" className="btn btn-danger " onClick={this.onSubmit}>Online Payment</button> &nbsp;&nbsp;
                               <button type="reset" className="btn btn-warning ">Clear</button>&nbsp;&nbsp;
                               <button type="button" className="btn btn-dark btn-middle" onClick={this.handleBack}>Back</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default BookHousekeeping
