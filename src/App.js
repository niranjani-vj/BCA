import React from 'react';
//import ReactDom from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './App.css';
import Form from './Form';
import Shopform from './Shopform';
import Login from './Login';
import Home from './Home';
import Shoplogin from './Shoplogin'
import ShopHome from './ShopHome';
import Navu from './Navu';
import Navs from './Navs';
import Shopgender from './Shopgender';
import ShopFemaleDis from './ShopFemaleDis'
import ShopMainPage from './ShopMainPage';
import ShopDisView from './ShopDisView';
import Userhome from './Userhome';
import ShopMaleDisView from './ShopMaleDisView';
import ShopFemaleDisView from './ShopFemaleDisView';
import UserMaleDis from './UserMaleDis';
import UserFemaleDis from './UserFemaleDis';
import AdminLogin from './AdminLogin';
import AdminHome from './AdminHome';
import AdminUsers from './AdminUsers';
import AdminShopOwners from './AdminShopOwners';
import AdminShopDis from './AdminShopDis';
//import Shop from './1.jpg';
//import Payment from './Payment';
const DivStyle = {
  //width:'100%',
  //height:'100%',
  height: '750px',
  backgroundColor: "#2d6187"
}
function App() {
  return (
    <div style={DivStyle}>
      <Router className="App">
        <div className="App">
          <Route path="/home" component={Home} />
          <Route path="/userReg" component={Form} />
          <Route path="/profReg" component={Shopform} />
          <Route path="/login" component={Login} />
          <Route path="/proflogin" component={Shoplogin} />
          <Route path="/profhousekeeping" component={ShopHome} />
          <Route path="/user" component={Navu} />
          <Route path="/prof" component={Navs} />
          <Route path="/addprof" component={Shopgender} />
          <Route path="/profchef" component={ShopFemaleDis} />
          <Route path="/profmainpage" component={ShopMainPage} />
          <Route path="/profview" component={ShopDisView} />
          <Route path="/userhome" component={Userhome} />
          <Route path="/housekeepingview" component={ShopMaleDisView} />
          <Route path="/chefview" component={ShopFemaleDisView} />
          <Route path="/userhousekeeping" component={UserMaleDis} />
          <Route path="/userchef" component={UserFemaleDis} />
          <Route path="/adminlogin" component={AdminLogin} />
          <Route path="/adminhome" component={AdminHome} />
          <Route path="/adminusers" component={AdminUsers} />
          <Route path="/adminshopowners" component={AdminShopOwners} />
          <Route path="/adminshopdis" component={AdminShopDis} />
          <Route exact path="/" component={Navu}>
            <Redirect to="/home" />
          </Route>

        </div>
      </Router>
      {/* <Navu/> */}
      {/* <h1>REBATES NEARBY</h1> */}
      {/* */}



    </div>
  );
}

export default App;
