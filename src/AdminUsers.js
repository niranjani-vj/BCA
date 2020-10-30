import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
class AdminUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            id: null
        }
    }
    handleViewUsers = e => {
        e.preventDefault();
        axios.get('http://localhost:5000/usersreg/')
            .then(res => {
                const user = res.data;
                // console.log(user);
                this.setState({ user });
            });
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }
    renderTable = e => {
        return this.state.user.map(da => {
            const { username, userphno, useremailid, createdAt } = da;
            return (
                <tr key={da._id}>
                    <td>{username}</td>
                    <td>{useremailid}</td>
                    <td>{userphno}</td>
                    <td>{createdAt.slice(0, 10)}</td>

                </tr>
            )
        })
    }
    render() {
        return (
            <div >
                <div className="dcent">
                    <h2 style={{ textAlign: "center" }}>Users</h2>
                    <button type="button" className="btn btn-outline-danger btn-block" onClick={this.handleViewUsers}>View Users</button>
                </div>
                <div className="tcent">
                    <Table id="user" striped bordered hover variant="dark">
                        <thead><td><b>Name</b></td><td><b>Email</b></td><td><b>Phno</b>Phno</td><td><b>Created At</b></td></thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default AdminUsers
