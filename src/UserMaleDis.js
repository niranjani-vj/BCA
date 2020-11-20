import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookHousekeeping from './BookHousekeeping';
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
var lat, lng;
var category
class UserMaleDis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dis: [],
            category:null,
            bookID : null
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
         axios.post('http://localhost:5000/profhousekeeping/dist',categories)
         .then(res=>console.log(res.data));
        const params = new URLSearchParams();
        // params.append('lat', Number(lat));
        // params.append('lng', Number(lng));
        // let a = window.confirm("CLick yes....")
        axios({
            method: 'post',
            url: 'http://localhost:5000/profhousekeeping/dist',
            data: params
        })
            .then(res => {
                const dis = res.data;
                this.setState({ dis })
            })
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
    tilldate = e => {
        // e.preventDefault();
        let today = `${year}${sep}${month}${sep}${da}`;
       // alert(`${year}${sep}${month}${sep}${da}`);
       // alert("Hi");
        const params = new URLSearchParams();
         params.append('Owner',this.state.Owner);
        axios({
            method: 'get',
            url: 'http://localhost:5000/profhousekeeping/',
            data:params
            
        })
            .then(res => {
                const till = res.data;
                console.log(till);
                for (let i = 0; i < till.length; i++) {
                    // alert(till[i]['to']);
                    let to = till[i]['to'].split('T', 1);
                    // alert(to[0]);    
                    if (today > to[0]) {
                        //alert(to[0]);
                        const params = new URLSearchParams();
                        params.append('_id', till[i]['_id']);
                        axios({
                            method: 'Post',
                            url: 'http://localhost:5000/profhousekeeping/mdisd',
                            data: params
                        })
                            .then(res => console.log(res.data));
                    }
                    else {
                        continue;
                    }

                }
            });
        this.props.history.push('/userhousekeeping');

    }
    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/userhome`)
    }

    handleBook(book_id,Owner,category,price) {
        console.log("Book")
        //console.log(book_id)
       // bookID = this.state.book_id;
        console.log(book_id," Owner: "+Owner,category,price)
         // this.props.history.post(`http://localhost:5000/profhousekeeping/book`,book_id)
         const params = new URLSearchParams();
         params.append('bookID',book_id)
         params.append('Owner',Owner)
         params.append('category',category)                
         params.append('price',price  )                
                          
         axios({
            method: 'Post',
            url: ' http://localhost:5000/profhousekeeping/book',
            data: params
        })
          this.props.history.push({ pathname: `/BookHousekeeping`,state:{bookID:book_id,Owner:Owner,category:category,price:price}});
    }
    renderTable = e => {
        return this.state.dis.map(ds => {
            const { discount, category, from, to } = ds;
            return (
                <tr key={ds._id}>
                    <td>{ds.Owner}</td>
                    <td>{category}</td>
                    <td>{discount}</td>
                
                    {/* <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td> */}
                    
                    <td><button type="button" className="btn btn-outline-light btn-block" onClick={()=> this.handleBook(ds._id,ds.Owner,ds.category,ds.discount)}>Book</button></td>
                        
                </tr>
            )
        })
    }
    render() {
        const diss = this.state.dis.map(ds => (
            <table className="table table-dark" key={ds._id}>
                <tr><th>Professional's Name</th><th>Category</th><th>Price</th></tr>
                <tr><td>{ds.Owner}</td><td>{ds.category}</td><td>{ds.discount}</td></tr>
            </table>
        ))
        return (
            <div><br></br>
                <div>
                <button type="button" className="btn btn-info" onClick={this.handleClick}>Click Me to View</button>
                    {/* <button type="button" className="btn btn-warning" onClick={this.handleloc}>Location🧿</button> */}
                </div>
                <h2 style={{ textAlign: "center" }}>Enjoy the experience!</h2>
                <form onLoadStart={this.handleLoad}>
                    <br />
                    <select name="category" className="form-control btn-outline-info" noValidate onChange={this.handleChange}>
                        <option value="">Choose Sub-services</option>
                        <option value="Laundary">Laundary</option>
                        <option value="Vessel_Washing">Vessel Washing</option>
                        <option value="Brooming">Brooming</option>
                        <option value="Sweeping">Sweeping</option>
                        <option value="Kitchen_Cleaning">Kitchen Cleaning</option>
                        <option value="Washroom_Maintenance">Washroom Maintenance</option>
                        <option value="Garden_Cleaning">Garden Cleaning</option>
                        <option value="Festive_Cleaning">Festive Cleaning</option>
                        <option value="All_Services">All Services</option>
                        {/* <option value="EthnicWear">Ethnic Wear</option>
                    <option value="Fabrics">Fabrics</option>
                    <option value="Winter_SeasonalWear">Winter & Seasonal Wear</option> */}
                    </select>
                    {/* <button type="button" className="btn btn-outline-warning btn-block" onClick={this.handleClick}>Sub-Service</button> */}
                    <button type="button" className="btn btn-outline-light btn-block" onClick={this.handleBack}>Back</button> 
                </form>
                <div>
                    <Table key='dis' className="table table-dark">
                        <thead><td><b>Professional's Name</b></td><th>Category</th><td><d>Price</d></td></thead>
                        <tbody>{this.renderTable()}</tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserMaleDis
