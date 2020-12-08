import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const mm = "0" + (newDate.getMonth() + 2);
const year = newDate.getFullYear();

const DivStyle = {
    width: '100%',
    //height:'100%',
    // height:'100vh',
    backgroundColor: "#2d6187"
}
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val == null && (valid = false)
    });
    return valid;
};
class ShopFemaleDis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: null,
            // typeofdiscounts: null,
            // brand: null,
            discount: null,
            from: null,
            to: null,
            // Shopname: null,
            // lat: null,
            // lng: null,
            formErrors: {
                // brand: "",
                // discount: "",
                // category: ""
                // typeofdiscounts: ""
            }
        };

    }
    handleSubmit = e => {
        e.preventDefault();
        var Owner = localStorage.getItem("owner");
        const params = new URLSearchParams();
        params.append('email', Owner);
        axios({
            method: 'post',
            url: 'http://localhost:5000/profreg/det',
            data: params
        })
            .then(res => {
                let sd = res.data;
                console.log(sd)
                console.log(sd[0]['shopname']);
                const Shopname = sd[0]['shopname'];
                // const lat = sd[0]['location']['lat'];
                // const lng = sd[0]['location']['lng'];
                this.setState({ Shopname });
                // this.setState({ lat });
                // this.setState({ lng });
            });
        //  alert(Owner);
        const disf = {
            Owner,
            // Shopname: this.state.Shopname,
            category: this.state.category,
            // typeofdiscounts: this.state.typeofdiscounts,
            // brand: this.state.brand,
            discount: this.state.discount,
            from: this.state.from,
            to: this.state.to
            // lat: this.state.lat,
            // lng: this.state.lng
        }
        if (formValid(this.state)) {
            // alert(this.state.shopname);
            console.log(disf);
            console.log('Form is valid');
            axios.post('http://localhost:5000/profhousekeeping/add', disf)
                .then(res => console.log(res.data));
            alert("Added!")
        }
        else {
            alert("Form is invalid")
        }

    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
         switch(name){
        //     case "brand":
        //         formErrors.brand = value.length < 0 ? "Please enter the brand":"";
        //         break;
           case "discount":
               formErrors.discount = value.length < 0 ? "Please enter the discount":"";
               break;
           case "category":
               formErrors.category = value.length<0 ?"Select Category":"";
               break;
        //    case "typeofdiscounts":
        //        formErrors.typeofdiscounts = value==null?"Select type of discount you need to enter":"";
        //        break;
               case "from":
                // if(this.state.typeofdiscounts==="ratediscount"){
                //     let asd=this.state.discount;
                //     //alert(asd);
                // let num = parseInt(asd);
                //  if(num > 0 && num <100 ){
                //      console.log('Number')
                //  }
                //  else{
                //      alert("Enter the percentage  Number in discount field.");
                //  }
                //  }
                // if(this.state.typeofdiscounts === "productdiscount"){
                //     let asd = this.state.discount;
                //     let num = parseInt(asd)
                //     //alert(num);
                //     if(parseInt(asd) >0 && num <100 ){
                //         alert("Don't insert Number in Discount field....")
                //     }
                //     else{
                //         console.log('Yes');
                //     }
                // }
                let date = value;
                console.log(`${year}${sep}${month}${sep}${da}`)
                if (this.state.from <= `${year}${sep}${month}${sep}${da}` ){
                    alert('Invalid date');
                    date="";
                }

                break;
            case "to":
              let to = value;
              if (to <=`${year}${sep}${month}${sep}${da}` ||  this.state.from > to){
                  alert('Invalid date');
                  to="";
              }
               break;

           default:
               break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }
    handleBack = e => {
        let Owner = localStorage.getItem("owner");
        let path = `/addprof`
        this.props.history.push(path, { Shop: Owner });
    }
    render() {
        return (
            <div style={DivStyle}>

                <div className="container">
                    <div className="dcent">
                        <h1>Housekeeping Details</h1>
                        {/* <h1>Enter Detalis to post Your discount</h1> */}
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <select name="category" id="category" className="form-control" noValidate onChange={this.handleChange}>
                                    <option value="">Choose Sub-services</option>
                                    <option value="Laundary">Laundary</option>
                                    <option value="Vessel_Washing">Vessel Washing</option>
                                    <option value="Brooming">Brooming</option>
                                    <option value="Sweeping">Sweeping</option>
                                    <option value="Kitchen_Cleaning">Kitchen Cleaning</option>
                                    <option value="Washroom_Maintenance">Washroom Maintenance</option>
                                    <option value="Garden_Cleaning">Garden Cleaning</option>
                                    <option value="Festive_Cleaning">Festive Cleaning</option>
                                    <option value="All_Services">All Services</option>
                                    {/* <option value="EthnicWear">Ethnic Wear</option>
                    <option value="Fabrics">Fabrics</option>
                    <option value="Winter_SeasonalWear">Winter & Seasonal Wear</option> */}
                                </select>
                            </div>
                            {/* <div className="form-group">
                   <input type="text" name="brand" noValidate className="form-control" placeholder="Type the Brand Name"  onChange={this.handleChange}/>
                </div> */}
                            {/* <div className="form-group">
                    <select noValidate name="typeofdiscounts" className="form-control" onChange={this.handleChange}>
                        <option value="null">Choose type of Discount</option>
                        <option value="productdiscount">Product Discount</option>
                        <option value="ratediscount">Rate Discount</option>
                    </select>
                </div> */}
                            <div className="form-group">
                                <input type="text" name="discount" noValidate className="form-control" placeholder="Type the price" onChange={this.handleChange} />
                            </div>
                            <div>
                                <span className="form-group">From:</span>
                                <input type="date" id="fromDate" name="from" className="form-control" onChange={this.handleChange} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               </div>
                            <div>
                                <span className="form-group">TO:</span>
                                <input type="date" name="to" id="toDate" className="form-control" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <br />
                                <button type="submit" className="btn btn-primary btn-block" >Click to Submit</button>
                                <button type="reset" className="btn btn-warning btn-block">Clear</button>
                                <button type="button" className="btn btn-dark btn-block" onClick={this.handleBack}>Back</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        )
    }
}

export default ShopFemaleDis
