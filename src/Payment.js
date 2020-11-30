import React, { Component } from 'react';
import axios from 'axios';
import paymentqr from './paymentqr.png'

const divStyle = {
    textAlign : 'center',
  // width: '50%',
   //  height:'250%',
    //height: '50%',
    backgroundColor: "#2d6187",
    backgroundSize: 'cover',
   paddingTop:"50px",
     paddingBottom:"50px",
     paddingRight:"50px",
     paddingLeft:"50px"
};
 class Payment extends Component {
     
    render() {
        return (
            <div style={divStyle} >
                <h1>Scan for the payment.....</h1>
                <img width="50%" height="50%"  className="photo" src={paymentqr} alt="pay"/> 
                <br/> <br/> <br/>
                <button type="button" className="btn btn-outline-info btn-block" onClick={this.handleBack}>Back</button> s
            </div>
        )
    }

    handleBack = e => {
        e.preventDefault();
        this.props.history.push(`/userhousekeeping`)
    }
}

                
export default Payment
