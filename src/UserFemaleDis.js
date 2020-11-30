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
            dis: [],
            //category:null
        }
    }

    handleChange = e => {
        e.preventDefault();
        const{name,value} = e.target;
        this.setState({[name]:value},()=>console.log(this.state));
    }
    handleClick = e => {
        e.preventDefault();
        console.log(typeof(this.state.category));
          let categories={
              categories:this.state.category};
         axios.post('http://localhost:5000/profchef/dist',categories)
         .then(res=>{
            const dis = res.data;
            this.setState({ dis })
            console.log(this.state.dis)
         });
        const params = new URLSearchParams();
        // params.append('lat', Number(lat));
        // params.append('lng', Number(lng));
        // let a = window.confirm("CLick yes....")
        
    }
    handleClicksub= e => {
        e.preventDefault();
        console.log(typeof(this.state.category));
          let categories={
              categories:this.state.category};
         axios.post('http://localhost:5000/profchef/disall',categories)
         .then(res=>{
            const dis = res.data;
            this.setState({ dis })
            console.log("All:" ,this.state.dis)
         });
        const params = new URLSearchParams();
        // params.append('lat', Number(lat));
        // params.append('lng', Number(lng));
        // let a = window.confirm("CLick yes....")
        
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
            url: 'http://localhost:5000/profchef/',
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
                            url: 'http://localhost:5000/profchef/fdisd',
                            data: params
                        })
                            .then(res => console.log(res.data));
                    }
                    else {
                        continue;
                    }

                }
            });
        this.props.history.push('/userchef');

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
            url: ' http://localhost:5000/profchef/book',
            data: params
        })
          this.props.history.push({ pathname: `/BookChef`,state:{bookID:book_id,Owner:Owner,category:category,price:price}});
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
        return (
            <div><br></br>
                <div>
               
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
                    <button type="button"  className="btn btn-outline-warning btn-block" onClick={this.handleClicksub}>Select the Sub-service</button>
                    <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleClick}>Click Me to View</button>
                    <button type="button" className="btn btn-outline-light btn-block" onClick={this.handleBack}>Back</button>
                </div>
                <div>
                    <Table key='dis' className="table table-dark">
                    <thead><td><b>Chef's Name</b></td><th>Category</th><td><d>Price</d></td></thead>
                        <tbody>{this.renderTable()}</tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserFemaleDis
