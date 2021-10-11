const {JWT_SECRET} = process.env
const express = require('express')
const usersRouter = express.Router()
const jwt = require ('jsonwebtoken')
//imoort functions from db
const { getUser, getUserByUsername, createUser } = require('../db')
const {requireUser} = require("./utils")

//POST /api/users/login
usersRouter.post("/login",async (req,res,next)=>{
    console.log("starting login")
    console.log("req.body",req.body)
    const {username,password}=req.body
    if (!username || !password){//check that both username and password are entered
        next({
            name: "ERROR-LOGIN_MissingCredentials",
            message: "Username and Password required. Please enter a username and a password"
        })
    }
    try{
        const user = await getUser({username,password})//using username and password to get the user from the db
        console.log("getUser: ",user)
        if(!user){//if the username and password do not match in the db
            next({
                name: "ERROR-LOGIN_IncorrectCredentials",
                message: "Username or Password is incorrect. Please try again."})
        }
        else {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
            res.send({ user, message: "you're logged in!", token });
        }
    }
    catch(error){
        console.error("ERROR-LOGIN ",error)
        next(error)
    }
})

//POST /api/user/register
usersRouter.post("/register",async (req,res,next)=>{
    const {username,password,email}=req.body
    console.log("username",username)
    console.log("password",password)
    console.log("email",email)
    if (!username || !password){//check that both username and password are entered
        next({
            name: "ERROR-REGISTER_MissingCredentials",
            message: "Username and Password required. Please enter a username and a password."
        })
    }
    try{
        const checkUsers = await getUserByUsername(username)
        if(checkUsers){
            next({
                name: "ERROR-REGISTER_UserExists",
                message: "A User with that Username already exists. Please try a different username."
            })
        }
        // else if(password.length<8){
        //     next({
        //         name:"ERROR-REGISTER_InsufficientPasswordLength",
        //         message: "The Password entered is too short. Passwords must be at least 8 characters in length."
        //     })
        // }
        else{
            const user = await createUser({username,password,email})
            if(!user){
                next({
                    name:"ERROR-REGISTER_UserCreationError",
                    message:"There a problem with your user registration. Please try again."
                })
            }
            else{
                const token = jwt.sign({is:user.id, username:user.username},JWT_SECRET)
                res.send({user,message:"registration complete. You are signed in!",token})
            }
        }

    }
    catch(error){
        console.log("ERROR-REGISTER ", error)
        next(error)
    }
})

//sends user data if a valid token is supplied
usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error)
    }
  })




module.exports = usersRouter