import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Nav } from 'react-bootstrap';
//import logo from './logo2.jpg';

const divStyle = {
    width: '100%',
    // height:'100%',
    height: '1050px',
    backgroundColor: "#2d6187",
    backgroundSize: 'cover'
};
class AdminShopOwners extends Component {
    constructor(props) {
        super(props)

        this.state = {
            regs: [],
            id: null
        }
    }

    handleshopdis = e => {
        this.props.history.push('/adminshopdis');
    }
    handleshopreg = e => {
        axios.get('http://localhost:5000/profreg/')
            .then(res => {
                const regs = res.data;
                console.log(regs);
                this.setState({ regs });
            });
    }
    renderTable = e => {
        return this.state.regs.map(ds => {
            const { shopname, email, name, gstno, phono } = ds;
            return (
                <tr key={ds._id}>
                    
                    
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phono}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <Nav className="navbar navbar-expand-sm bg-info navbar-light">
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Logout</a>
                        </li>
                    </ul>
                </Nav>
                <div style={divStyle}>
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <button className="btn btn-danger btn-block" type="button" onClick={this.handleshopreg}>Professional Reg </button>
                            <button className="btn btn-danger btn-block " type="button" onClick={this.handleshopdis}>Professional's Services</button>
                        </div>
                        <div className="tcent">
                            <Table id="regs" striped bordered hover variant="dark">
                                <thead><td><b>Professional's Name</b></td><td><b>Email</b></td><td><b>Phno</b></td></thead>
                                <tbody>
                                    {this.renderTable()}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default AdminShopOwners
