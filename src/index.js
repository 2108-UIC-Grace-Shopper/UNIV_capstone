import axios from "axios";
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./header";
import HomePage from "./homePage";
import LoginScreen from "./login";
import Products from "./products";
import Register from "./register"
import Cart from "./cart.js"



const App = () => {
    const [token,setToken]=useState("")
    const [user,setUser]=useState("")

    useEffect(()=>{
        const getUser = async()=>{
            const gotUser = await axios.get(`/api/users/me`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            //console.log("gotUser: ",gotUser.data)
            setUser(gotUser.data)
      
        }
        if (localStorage.getItem("token")){
            getUser()
            setToken(localStorage.getItem("token"))
        }//if token is in local storage get the token from local storage and set to token then set user to results of getUser
        else{
            setToken("")
        }

    },[])

    return (
        <Router>
        <div>
        <header>
            <Header
            token={token}
            setToken={setToken}
            />
        </header>
        <div>
            
                <Route //products
                path = "/products"
                render={()=>
                    <Products
                    />}
                />
                <Route //Login
                    path = "/login"
                    render={(renderprops)=>
                    <LoginScreen
                    {...renderprops}
                    setToken={setToken}
                    />}
                />
                <Route //Register
                    path = "/register"
                    render={(renderprops)=>
                    <Register
                    {...renderprops}
                    setToken={setToken}
                    />}
                />
        </div>
        </div>
        </Router>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));