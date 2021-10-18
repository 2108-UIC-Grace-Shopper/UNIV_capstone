const express = require('express')
const { getOrderById, getAllOrders, getOrderIdByUserId,createOrder,updateOrder } = require('../db')
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

//POST /api/orders/users/:userId
ordersRouter.post("/users/:usersId", async (req,res,next)=>{
    try{
        
        const {usersId} = req.params
        const status = false
        // console.log("usersId: ",usersId)
        const checkForOrder = await getOrderIdByUserId(usersId,status)
        if(checkForOrder.length > 0){
            console.log("checkForOrder: ",checkForOrder)
            next({
                name:"order already exists",
                message:"an order for that user is already in use"
            })
        }
        else{
            const createdOrder = await createOrder({usersId,status})
            // console.log("createdOrder: ",createdOrder)
            res.send(createdOrder)
        }
    }
    catch(error){
        console.error("ERROR-POSTORDER",error)
        next(error)
    }
})

//PATCH /orders/:orderId
ordersRouter.patch("/:id", async (req,res,next)=>{
    try{
        const {id} = req.params
        const {status} = req.body
        console.log("API: orderId: ",id," status: ", status)
        const updateResponse = await updateOrder(id,status)
        res.send(updateResponse)
    }
    catch(error){
        console.error("ERROR-POSTORDER",error)
        next(error)
    }
})


module.exports = ordersRouter