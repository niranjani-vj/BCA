import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
var lat, lng;
var category
const DivStyle = {
    //width:'100%',
    //height:'100%',
    height: '750px',
    color:'#FFF',
    backgroundColor: "#2d6187"
}
class BookHousekeeping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dis: [],
            category:null,
            book_id:null,
            Owner:null,
            User:null,
            category:null,
            price:null
            // lat: null,
            // lng: null
            
        }
    }

    

    handleClick = e => {
        e.preventDefault();

        console.log(category)
         const categories={
             category
         }
         
         const details = {
             book_id : this.props.location.state.bookID, 
             Owner : this.props.location.state.Owner,
             category : this.props.location.state.category,
             price : this.props.location.state.price,
         }
         console.log(details)
         axios.post('http://localhost:5000/profhousekeeping/book',details)
        //  .then(res=>console.log("Details: ",res.data));
         .then(res => {
            const dis = res.data;
            this.setState({ dis })
            console.log({dis})
        })
        
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
    handleLoad = e => {
        e.preventDefault();
        alert('Loading');
    }
    // handleloc = e => {
    //     navigator.geolocation.watchPosition(getposition);
    //     function getposition(position) {
    //         lat = position.coords.latitude;
    //         lng = position.coords.longitude;
    //     }
    //     this.tilldate();
    // }
   
    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/userhousekeeping`)
    }
    renderTable = e => {
        return this.state.dis.map(bk => {
            const { Owner,category, price } = bk;
            return (
                // <label for="male">{Owner}</label>
               <input type="text" />
            )
        })
    }
    
    render() {
       
        
        return (
            <div style={DivStyle}>

            <div className="container">
            <div className="cent">
                {/* <button type="button" className="btn btn-info" onClick={this.handleClick}>Click Me to View</button> */}
                    {/* <button type="button" className="btn btn-warning" onClick={this.handleloc}>Location🧿</button> */}
                </div><br></br>
                <h2 style={{ textAlign: "center" }}>Booking!</h2>
                
                
                    <form>
                        <div className="form-group">
                        <span className="form-group">Email:</span>
                           <input type="email" className="form-control" name="useremailid" value={this.props.location.state.Owner} disabled='true' id="username" placeholder="Email" onChange={this.handleChange} />   
                        </div>
                        <div className="form-group">
                        <span className="form-group">Services:</span>
                           <input type="text" className="form-control" name="category" value={this.props.location.state.category} disabled='true' id="username" placeholder="Email" onChange={this.handleChange} />   
                        </div>
                        <div className="form-group">
                        <span className="form-group">Price:</span>
                           <input type="text" className="form-control" name="price" value={this.props.location.state.price} disabled='true' id="username" placeholder="Email" onChange={this.handleChange} />   
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
                            <select name="category" className="form-control btn-outline-info" noValidate onChange={this.handleChange}>
                            <option value="">T-I-M-E</option>
                        <option value="9:00-10:00 AM">9:00-10:00 AM</option>
                        <option value="10:00-11:00 AM">10:00-11:00 AM</option>
                        <option value="1:00-3:00 PM">1:00-3:00 PM</option>
                        <option value="3:00-4:00 PM">3:00-4:00 PM</option>
                        <option value="4:00-5:00 PM">4:00-5:00 PM</option>
                        
                    </select>
                        </div>
                            <div className="form-group">
                               <br />
                               <button type="submit" className="btn btn-primary " >Click to Submit</button> &nbsp;&nbsp;
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
