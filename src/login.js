import React,{useState} from "react";
import axios from "axios"
import {BrowserRouter as Router,Route,Link, Redirect} from "react-router-dom"



const LoginScreen = (props) => {
    let {setToken}=props
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")

    async function Login(){
        let user = {"username":username,"password":password}
        try{
            const loginResponse = await axios.post("/api/users/login",user)
            console.log("loginResponse",loginResponse)
            setToken(loginResponse.data.token)
            localStorage.setItem("token",loginResponse.data.token)
            props.history.push("/products")
        }
        catch(error){
            console.log("ERROR-login",error)
            alert("There was an issue with your login attempt")
        }
    }
    function handleSubmit(event){
        event.preventDefault()//forgot this the first time
        Login()
    }


    return (
        <div>
            <div>
                <form id="login-form" onSubmit={handleSubmit}>
                    
                        <label className="username"><p>Username</p></label>
                        <input type="text" placeholder="Enter Username" name="uname" value = {username} onChange={function(event){setUsername(event.target.value)}} required/>
                        <label className="password"><p>Password</p></label>
                        <input type="password" placeholder="Enter Password" name="psw" value = {password} onChange={function(event){setPassword(event.target.value)}} required/>
                        <button type="submit">Login</button>
                        {/* <button type="submit">Register</button> */}
                        <button type="submit"><Link to = "/register" className="linkto-styleA">Register</Link></button>

                </form>
            </div>
        </div>
    )
}
export default LoginScreen
