import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./header";
import HomePage from "./homePage";
import LoginScreen from "./login";
import Products from "./products";



const App = () => {
    const [token,setToken]=useState("")

    return (
        <div>
        <header>
            <Header/>
        </header>
        <div>
            <Router>
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
                    token={token}
                    setToken={setToken}
                    />}
                />
            </Router>
        </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));