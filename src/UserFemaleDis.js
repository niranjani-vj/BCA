import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
let lat, lng;
class UserFemaleDis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dis: []
        }
    }

    handleClick = e => {
        e.preventDefault();
        //  alert('Hi');
        const params = new URLSearchParams();
        params.append('lat', Number(lat));
        params.append('lng', Number(lng));
        axios({
            method: 'post',
            url: 'http://localhost:5000/femaledis/dist',
            data: params
        })
            .then(res => {
                const dis = res.data;
                //console.log(dis)
                this.setState({ dis });
            });
    }
    handleview = e => {
        e.preventDefault();
        console.log("Checking.......")
        alert('Checking..........');

    }
    handleloc = e => {
        navigator.geolocation.watchPosition(getposition);
        function getposition(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        }
        this.tilldate();
    }
    handleBack = e => {
        this.props.history.push(`/userhome`);
    }
    tilldate = e => {
        let today = `${year}${sep}${month}${sep}${da}`;
        // alert(`${year}${sep}${month}${sep}${da}`);
        //alert("Hi");
        // const params = new URLSearchParams();
        //  params.append('Owner',this.state.Owner);
        axios({
            method: 'get',
            url: 'http://localhost:5000/femaledis/',
            //data:params
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
                            url: 'http://localhost:5000/femaledis/fdisd',
                            data: params
                        })
                            .then(res => console.log(res.data));
                    }
                    else {
                        continue;
                    }

                }
            });
        this.props.history.push('/userfemaledis');
    }
    renderTable = e => {
        return this.state.dis.map(ds => {
            const { Shopname, brand, category, discount, from, to } = ds;
            return (
                <tr key={ds._id}>
                    <td>{Shopname}</td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>{discount}</td>
                    <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td>

                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <div><br />
                    {/* <button type="button" className="btn btn-warning" onClick={this.handleloc}>Location🧿</button> */}
                </div>
                <h2 style={{ textAlign: "center" }}>Enjoy the experience!</h2>
                <div>
                    <select name="category" className="form-control btn-outline-info" noValidate onChange={this.handleChange}>
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
                    </select>
                    {/* <button type="button"  className="btn btn-outline-warning btn-block" onClick={this.handleClick}>Select the Sub-service</button> */}
                    <button type="button" className="btn btn-outline-light btn-block" onClick={this.handleBack}>Back</button>
                </div>
                <div>
                    <Table key='dis' className="table table-dark">
                        <thead><td><b>Chef's Name</b></td><td><d>Price</d></td><td><d>From</d></td><td><d>To</d></td></thead>
                        <tbody>{this.renderTable()}</tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserFemaleDis
