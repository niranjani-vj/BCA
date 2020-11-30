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
class Userbookingchef extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mdis: [],
            user:null
            // lat: null,
            // lng: null
        }
    }



    handleClick = e => {
        e.preventDefault();
        this.tilldate();
        // alert(this.state.Owner);
        const params = new URLSearchParams();
        params.append('user', localStorage.getItem("Useremail"));
        axios({
            method: 'post',
            url: 'http://localhost:5000/bookchef/disp',
            data: params
        })
            .then(res => {
                const mdis = res.data;
                if(mdis.length==0){
                    alert("No booking yet!")
                    this.props.history.push(`/userhome`)
                }
                console.log(mdis.length);
                this.setState({ mdis });
            });
    }
    tilldate = e => {
        // e.preventDefault();
        let today = `${year}${sep}${month}${sep}${da}`;
        // alert(`${year}${sep}${month}${sep}${da}`);
        // alert("Hi");
        const params = new URLSearchParams();
        params.append('user',  localStorage.getItem("Useremail"));
        axios({
            method: 'post',
            url: 'http://localhost:5000/bookchef/disp',
            data: params
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
                            url: 'http://localhost:5000/bookchef/mdisd',
                            data: params
                        })
                            .then(res => console.log(res.data));
                    }
                    else {
                        continue;
                    }

                }
            });
    }
    handeleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }
    handleDel = e => {
        e.preventDefault();
        const params = new URLSearchParams();
        let che = (this.state.id) - 1;
        if (che < 1) {
            alert("Nothing to delete..")
        }
        else {
            let ad = this.state.mdis[(this.state.id) - 1]['_id'];
            params.append('_id', ad);
            axios({
                method: 'Post',
                url: 'http://localhost:5000/bookchef/mdisd',
                data: params
            })
                .then(res => alert(res.data));
        }


    }


    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/userbookings`)
    }

    handleCancel(book_id,Owner,category,price){
        console.log(book_id)
        const params = new URLSearchParams();
        params.append('_id',book_id)
        axios({
            method: 'post',
            url: 'http://localhost:5000/bookchef/cancel',
            data: params
        })
            .then(res => alert(res.data));
            window.location.reload(true);

    }

    
    renderTable = e => {
        return this.state.mdis.map(ds => {
            const { price, category, from, to, time,status } = ds;
            return (
                <tr key={ds._id}>
                    <td>{ds.Owner}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td>
                    <td>{time}</td>
                    <td>{status}</td>
                    <td><button type="button" className="btn btn-outline-danger btn-block" onClick={()=> this.handleCancel(ds._id,ds.Owner,ds.category,ds.discount)}>Cancel</button></td>
                        
                </tr>
            )
        })
    }
    render() {
        const diss = this.state.mdis.map(ds => (
            <table className="table table-dark" key={ds._id}>
                <tr><th>Professional's Email</th><th>Category</th><th>Price</th></tr>
                <tr><td>{ds.Owner}</td><td>{ds.category}</td><td>{ds.discount}</td></tr>
            </table>
        ))
        return (
            <div><br></br>
                <div>
                
                    {/* <button type="button" className="btn btn-warning" onClick={this.handleloc}>Location🧿</button> */}
                </div>
                <h2 style={{ textAlign: "center" }}>Your Bookings!</h2>
                <form onLoadStart={this.handleLoad}>
                    <br />
                    {/* <select name="category" className="form-control btn-outline-info" noValidate onChange={this.handleChange}>
                        <option value="">Choose Cuisine</option>
                        <option value="South_Indian">South Indian</option>
                        <option value="North Indian">North Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Jain_Food">Jain Food</option>
                        <option value="Sweets_and_Dessert">Sweets and Dessert</option>
                        <option value="Savoury">Savoury</option>
                        <option value="Pickles_&_Masala">Pickles & Masala</option>
                        <option value="Occasion">Occasion</option>
                        <option value="All_Catering_Services">All Catering Services</option>
                        <option value="Customised">Customised</option>
                    </select> */}
                    {/* <button type="button" className="btn btn-outline-warning btn-block" onClick={this.handleClick}>Sub-Service</button> */}
                    <button type="button" className="btn btn-info btn-block" onClick={this.handleClick}>Click Me to check my Bookings</button>
                    <button type="button" className="btn btn-outline-light btn-block" onClick={this.handleBack}>Back</button> 
                </form>
                <div>
                    <Table key='dis' className="table table-dark">
                        <thead><td>Professional's Email</td><th>Category</th><td><d>Price</d></td><td><d>From</d></td><td><d>To</d></td><td><d>Time</d></td><td><d>Status</d></td></thead>
                        <tbody>{this.renderTable()}</tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Userbookingchef
