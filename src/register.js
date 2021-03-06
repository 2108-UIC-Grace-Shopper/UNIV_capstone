import axios from "axios";
import React, { useState } from "react";


const Register = (props) => {
    const{setToken,setOrderId}=props
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[passwordconfirm,setPasswordConfirm]=useState("")
    const[email,setEmail]=useState("")

    async function register(){
        let user = {"username":username,"password":password,"email":email}
        //console.log("user: ",user)
        try{
            if(password === passwordconfirm){
                const registrationResponse = await axios.post("/api/users/register",user)
                setToken(registrationResponse.data.token)
                //console.log("userId: ",registrationResponse.data.user.id)
                localStorage.setItem("token",registrationResponse.data.token)
                const newOrder = await axios.post(`/api/orders/users/${registrationResponse.data.user.id}`)
                //console.log ("newOrder: ",newOrder)
                setOrderId(newOrder.data.id)
                props.history.push("/products")
            }
            else{
                console.log(console.log("ERROR-password mismatch"))
                alert("Please reconfirm your password.")
            }

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
                        <label className="email"><p>Confirm Password</p></label>
                        <input type="password" placeholder="Enter Password" name="psw" value = {passwordconfirm} onChange={function(event){setPasswordConfirm(event.target.value)}} required/>
                        <label className="email"><p>Email</p></label>
                        <input type="email" placeholder="Enter Email" name="email" value = {email} onChange={function(event){setEmail(event.target.value)}} required/>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register