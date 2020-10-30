import React, { Component } from 'react'
import Img from './PhonePeQR.png';
 class Payment extends Component {
    render() {
        return (
            <div >
                <h1>Scan for the payment.....</h1>
                <img className="photo" src={Img} alt="pay"/>
            </div>
        )
    }
}

export default Payment
