const express = require('express')
const { getOrderById, getAllOrders, getOrderIdByUserId } = require('../db')
const ordersRouter = express.Router()

//GET /api/orders
ordersRouter.get("/", async (req,res,next) =>{
    try{
        const orders = await getAllOrders()
        res.send(orders)
    } catch(error){
        console.error("ERROR-ALLORDERS ", error)
        next(error)
    }
})

//GET /api/orders/:ordersId
ordersRouter.get("/:id", async (req, res, next) =>{
    try{
        const {id} = req.params
        const orders = await getOrderById(id)
        res.send(orders)
    } catch(error){
        console.error("ERROR-ORDERSBYID, error")
        next(error)
    }
})

//GET /api/orders/users/:userId
ordersRouter.get("/users/:userId", async (req,res,next)=>{
    try{
        const {userId} = req.params
        console.log("userId: ",userId)
        const orderId = await getOrderIdByUserId(userId,false)
        console.log("orderId: ",orderId)
        res.send(orderId)
    }
    catch(error){
        console.error("ERROR-ORDERIDBYUSERID",error)
        next(error)
    }
})


module.exports = ordersRouter