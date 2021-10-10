import axios from "axios";
import React, { useState } from "react";


const Register = (props) => {
    const{setToken}=props
    const[username,setUserName]=useState("")
    const [password,setPassword]=useState("")

    async function register(){
        let user = {"username":username,"password":password}
        try{
            const registrationResponse = await axios.post("/api/users/register",user)
            setToken(registrationResponse.data.token)
            localStorage.setItem("token",registra.data.token)
            props.history.push("/products")

        }
        catch(error){
            console.log("ERROR-registration",error)
            alert("There was an issue with your registration attempt")
        }
    }
    function handleSubmit(event){
        event.preventDefault()//forgot this the first time
        register()
    }

    return (
        <div>
            <div>
                <form id="register-form" onSubmit={handleSubmit}>
                    <div className="container">
                        <label className="username"><p>Username</p></label>
                        <input type="text" placeholder="Enter Username" name="uname" value = {username} onChange={function(event){setUserName(event.target.value)}} required/>
                        <label className="password"><p>Password</p></label>
                        <input type="password" placeholder="Enter Password" name="psw" value = {password} onChange={function(event){setPassword(event.target.value)}} required/>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register