import React, { Component } from 'react'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo2.jpg';

const DivStyle = {
  width: '100%',
  //height:'100%',
  height: '100vh',
  backgroundColor: "#2d6187"
}
class ShopMainPage extends Component {
  handleAddDiscount = e => {
    var Owner = this.props.location.state.Shop;
    //  alert(Owner);
    let path = `/addprof`
    this.props.history.push(path, { Shop: Owner });
  }
  handleView = e => {
    var Owner = this.props.location.state.Shop;
    // alert(Owner);
    let path = `/profview`
    this.props.history.push(path, { Shop: Owner });
  }

  render() {
    return (
      <div style={DivStyle}>
        <Nav className="navbar navbar-expand-sm bg-info navbar-light">
          <a className="navbar-brand" href=" "><img src={logo} /></a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/proflogin">Logout</a>
            </li>

          </ul>
        </Nav>
        <br />
        <div className="hcent">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleAddDiscount}>Add Services</button>
          <button type="button" className="btn btn-secondary btn-block" onClick={this.handleView}>View Services</button>
        </div>
      </div>
    )
  }
}
export default ShopMainPage
