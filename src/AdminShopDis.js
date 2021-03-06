import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Nav } from 'react-bootstrap';
const divStyle = {
    width: '100%',
    height: '100%',
    // height:'750px',
    backgroundColor: "#2d6187"
};
class AdminShopDis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mdis: [],
            fdis: []
        }
    }
    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/adminshopowners`);
    }
    handleMen = e => {
        e.preventDefault();
        axios.get('http://localhost:5000/profhousekeeping/')
            .then(res => {
                const mdis = res.data;
                console.log(mdis);
                this.setState({ mdis });
            });
        axios.get('http://localhost:5000/profchef/')
            .then(res => {
                const fdis = res.data;
                console.log(fdis);
                this.setState({ fdis });
            });
    }
    renderTable = e => {
        return this.state.fdis.map(ds => {
            const { Shopname, brand, category, from, to } = ds;
            return (
                <tr key={ds._id}>
                 
                    <td>{category}</td>
                    <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td>
                </tr>
            )
        })
    }
    renderTab = e => {
        return this.state.mdis.map(ms => {
            const { Shopname, brand, category, from, to } = ms;
            return (
                <tr key={ms._id}>
                    
                    <td>{category}</td>
                    <td>{from.slice(0, 10)}</td>
                    <td>{to.slice(0, 10)}</td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div style={divStyle}>
                <div>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Logout</a>
                        </li>
                    </ul>
                </Nav>
                <br/> 
                    <button type="button" className="btn btn-primary btn-block " onClick={this.handleMen}>View Services</button>

                </div>
                <div>
                    <Table id="fdis" striped bordered hover variant="dark">
                        <thead><td><b>Name of all services</b></td><td><b>From</b></td><td><b>TO</b></td></thead>
                        <tbody>
                            {this.renderTable()}
                            {this.renderTab()}
                        </tbody>
                    </Table>
                </div>
                <button type="button" className="btn btn-warning " onClick={this.handleBack}>Back</button>
            </div>
        )
    }
}

export default AdminShopDis
