const express = require('express')
const apiRouter = express.Router()
const {getUserById}=require('../db')
const {client} = require('../db/client')
const jwt = require('jsonwebtoken')

apiRouter.get("/health", (req,res,next)=>{
    res.send ({message:"everything is awesome"})
})

//setting up user check
apiRouter.use(async (req,res,next)=>{
    const prefix = "Bearer "
    const auth = req.header("Authorization")

    if(!auth){ //if there is no auth in the header then skip
        next()
    }
    else if(auth.startsWith(prefix)){ //if auth starts with "Bearer "
        const token = auth.slice(prefix.length) //slice off "Bearer " which should leave us with a token
        try{
            const {id} = jwt.verify(token, JWT_SECRET) //creates id which uses jwt verify to get the user id from the token
            if(id){ //if id is truthy than store the results of getUserById for the id in req.user
                req.user = await getUserById(id)
                next()
            }
        }
        catch({name,message}){
            next({name,message})
        }
    }
    else{
        next({
            name: "Authorization Header error",
            message: "The authorization Header must start with Bearer"
        })
    }
})

apiRouter.use((req,res,next)=>{ //user this for all routes
    if(req.user){ //if req.user is true (from the previous function) console log what it is
        console.log("user is set", req.user)
    }
    next()
})

const usersRouter = require('./users') //set route for /api/users
apiRouter.use('/users',usersRouter)

const productsRouter = require('./products') //set route for /api/products
apiRouter.use('/products',productsRouter)

const ordersRouter = require('./orders') //set route for /api/orders
apiRouter.use('/orders',ordersRouter)

const orders_productsRouter = require('./orders_products') //set route for /api/orders_products
apiRouter.use('/orders_products',orders_productsRouter)

module.exports =apiRouter