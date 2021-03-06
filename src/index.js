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
import SingleProduct from "./singleProduct";


const App = () => {
    const [token,setToken]=useState("")
    const [user,setUser]=useState("")
    const [orderId,setOrderId]=useState("")
    const [productId,setProductId]=useState("")


    useEffect(()=>{
        const getState = async()=>{
            const gotUser = await axios.get(`/api/users/me`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            setUser(gotUser.data)
            const gotOrderId = await axios.get(`/api/orders/users/${gotUser.data.id}`)
            //console.log("gotOrderId: ",gotOrderId.data[0].id)
            setOrderId(gotOrderId.data[0].id)
        }
        

        if (localStorage.getItem("token")){
            getState()
            setToken(localStorage.getItem("token"))
        }//if token is in local storage get the token from local storage and set to token then set user to results of getUser
        else{
            setToken("")
        }

    },[])

    console.log("state user:",user)
    console.log("state orderId: ",orderId)

    return (
        <Router>
        <div>
        <header>
            <Header
            token={token}
            setToken={setToken}
            setOrderId={setOrderId}
            />
        </header>
        <div>
            
                <Route //products
                    path = "/products"
                    render={(renderprops)=>
                    <Products
                        {...renderprops}
                        token={token}
                        orderId={orderId}
                        productId={productId}
                        setProductId={setProductId}
                    />}
                />
                <Route //Login
                    path = "/login"
                    render={(renderprops)=>
                    <LoginScreen
                        {...renderprops}
                        setToken={setToken}
                        setOrderId={setOrderId}
                        orderId={orderId}
                    />}
                />
                <Route //Register
                    path = "/register"
                    render={(renderprops)=>
                    <Register
                        {...renderprops}
                        setToken={setToken}
                        setOrderId={setOrderId}
                    />}
                />
                <Route //Cart
                    path = "/cart"
                    render={(renderprops)=>
                    <Cart
                        {...renderprops}
                        token={token}
                        orderId={orderId}
                        setOrderId={setOrderId}
                        user={user}
                        productId={productId}
                        setProductId={setProductId}
                    />}
                />
                 <Route //singleProduct
                path = "/singleProduct"
                render={()=>
                    <SingleProduct
                    token={token}
                    orderId={orderId}
                    productId={productId}
                    setProductId={setProductId}
                    />}
                />
                <Route //home
                    exact path = "/"
                    render={()=>
                    <HomePage
                    />}
                />
        </div>
        </div>
        </Router>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));