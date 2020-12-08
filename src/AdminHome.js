import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
 class AdminHome extends Component {
     handleShopOwners=e=>{
        this.props.history.push('/adminshopowners');
     }
     handleUsers=e=>{
        this.props.history.push('/adminusers');
     }
    render() {
        return (
            <div className="fcent">
                <div className="form-wrapper">
                <h1>Welcome Admin!</h1><br></br>
                <button type="button"  className="btn btn-outline-primary btn-block" onClick={this.handleUsers}>Check Users</button>
                <button type="button"  className="btn btn-outline-primary btn-block" onClick={this.handleShopOwners}>Check Professional</button>
                </div>
            </div>
        )
    }
}

export default AdminHome
