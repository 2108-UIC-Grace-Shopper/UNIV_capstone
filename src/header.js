import React from "react";
import {BrowserRouter as Router,Route,Link, Redirect} from "react-router-dom"

const Header = (props) => {
let {token,setToken,setOrderId}=props

function logoutFunc(event){
  event.preventDefault()//fixed mistake here
  setToken("")
  localStorage.removeItem("token")
  setOrderId("")

}

    return (
    <div className="dropdown">
    <button className="dropbtn">Dropdown</button>
    <button className="material-icons md-48 md-dark"><Link to = "/cart">CART</Link></button>
    <div className="dropdown-content">
    <ul id="navigation">
        <li>
          <a href="" className="material-icons md-48 md-dark">home</a>
        </li>
        <li>
          <a href="" target="_blank" className="material-icons md-48 md-dark">account_circle</a>
        </li>
        {token ? <li className="logout" onClick = {logoutFunc}>logout</li>:<li className="material-icons md-48 md-dark"><Link to = "/login">login</Link></li>}
        {/* <li>
          <a href="" target="_blank" class="material-icons md-48 md-dark">login</a>
        </li> */}
        <li className="material-icons md-48 md-dark"><Link to = "/products">store</Link></li>
        {/* <li>
            <a href="" target="_blank" class="material-icons md-48 md-dark">store</a>
        </li> */}
      </ul>
</div>
</div>
    );
}
export default Header
