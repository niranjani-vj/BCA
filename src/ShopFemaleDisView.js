import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
const DivStyle = {
    width: '100%',
    //height:'100%',
    height: '100vh',
    backgroundColor: "#2d6187"
}
class ShopFemaleDisView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Owner: this.props.location.state.Shop,
            fdis: [],
            id: null,
            count: 0
        }
    }
    handleFemaledis = e => {
        e.preventDefault();
        this.tilldate();
        // alert(this.state.Owner);
        const params = new URLSearchParams();
        params.append('Owner', this.state.Owner);
        axios({
            method: 'post',
            url: 'http://localhost:5000/profchef/fdis',
            data: params
        })
            .then(res => {
                const fdis = res.data;
                // console.log(fdis);
                this.setState({ fdis });
            });
    }
    tilldate = e => {
        // e.preventDefault();
        let today = `${year}${sep}${month}${sep}${da}`;
        // alert(`${year}${sep}${month}${sep}${da}`);
        // alert("Hi");
        const params = new URLSearchParams();
        params.append('Owner', this.state.Owner);
        axios({
            method: 'post',
            url: 'http://localhost:5000/maledis/mdis',
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
    }
    handeleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }
    //  handleSubmit = e=>{
    //      //e.preventDefault();
    //      const params = new URLSearchParams();
    //      params.append('_id',this.state.id);
    //      axios({
    //          method:'Post',
    //          url:'http://localhost:5000/profchef/fdisd',
    //          data:params
    //      })
    //      .then(res=>alert(res.data));

    //  }
    handleBack = e => {
        let Owner = this.props.location.state.Shop;
        let path = `/profview`;
        this.props.history.push(path, { Shop: Owner })

    }
    handleDel = e => {
        e.preventDefault();
        const params = new URLSearchParams();
        let che = (this.state.id) - 1;
        if (che < 1) {
            alert("Nothing to delete..")
        }
        else {
            let ad = this.state.fdis[(this.state.id) - 1]['_id'];
            params.append('_id', ad);
            axios({
                method: 'Post',
                url: 'http://localhost:5000/profchef/fdisd',
                data: params
            })
                .then(res => alert(res.data));
        }

    }
    renderTable = e => {
        return this.state.fdis.map(fd => {
            const { category, typeofdiscounts, brand, discount, from, to } = fd
            this.state.count = this.state.count + 1;
            return (
                <tr key={fd._id}>
                    <td>{this.state.count}</td>
                    <td>{category}</td>
                    <td>{discount}</td>
                    <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td>
                </tr>
            )
        })
    }
    render() {

        return (
            <div style={DivStyle}>
                <div>
                    <button type="button" className="btn btn-info" onClick={this.handleFemaledis}>Click Me to View</button>
                </div>
                <div>
                    <Table id='fdis' striped bordered hover variant="dark">
                        <thead><td>NO</td><td>Category</td><td>Price</td><td>From</td><td>To</td></thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </Table>
                </div>
                <form className="form-group">
                    {/* <input type="text" placeholder="Enter Id to delete" name="id" onChange={this.handeleChange} /><br />
                    <button type="submit" className="btn btn-danger" onClick={this.handleDel}>Delete</button> */}
                </form>
                <div>
                    <button type="button" className="btn btn-outline-info" onClick={this.handleBack}>Back</button>
                </div>
            </div>
        )
    }
}

export default ShopFemaleDisView
