const express = require('express')
const orders_productsRouter = express.Router()
const { createOrdersProducts,
    getOrdersProductsById,
    updateOrdersProducts,
    updateOrdersProductsQuantity,
    deleteOrdersProducts,
    getOrdersProductsByOrdersId,
    getOrdersProductsByProductId}
    = require('../db')
const { requireUser } = require('./utils')

//GET /api/orders_products
orders_productsRouter.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const currentOrder = await getOrdersProductsById(id)
    
            res.send(currentOrder)
     
    } catch(error){
       console.error("ERROR-Orders_products by ID")
       next(error)
    }
})

//PATCH /api/orders_products/:Id
// orders_productsRouter.patch('/:Id',  async(req, res, next) => {    
//     const { id} = req.params 
//     const { quantity } = req.body
    
//     const  updateFields = {}

//     if (quantity) {
//         updateFields.quantity = quantity
//     }
//     try{
//         const originalOrder = await getOrdersProductsById(id)

//         if (originalOrder.orders.usersId === req.user.id){
//             const updatedOrder = await updateOrdersProducts(orders_productsId)   
//             res.send (
//                 updatedOrder
//             )
//         } else {
//             next({
//                 name: 'Unauthorized user',
//                 message: 'You cannot update order'
//             })
//         }
//     }catch({name, message}){
//         console.error("ERROR-orders_productsRouter PATCH")
//         next({ name, message})
//     }    
//  }
// )

//DELETE /api/orders_products/:Id
orders_productsRouter.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const deleteOrder = await deleteOrdersProducts(id)
            res.send({deleteOrder, 
        message:`Deleted` ,
        })
     
    } catch(error){
       console.error("ERROR-deleteOrdersProducts by ID")
       next(error)
    }
})

//GET/api/orders_products/order/:orderId
orders_productsRouter.get('/order/:orderId', async (req,res,next)=>{
    try{
        const {orderId} = req.params
        console.log("orderId: ",orderId)
        const orders_products=await getOrdersProductsByOrdersId(orderId)
        console.log("orders_products: ",orders_products)
        res.send(orders_products)
    }
    catch(error){
        console.error("ERROR-getOrdersProducts by orderId")
        next(error)
     }
})

//POST/api/order_products/order/:orderId
orders_productsRouter.post('/order/:orderId', async (req,res,next)=>{
    try{
        const {orderId}=req.params
        const {productId,quantity}=req.body
        //console.log("orderId: ",orderId)
        //console.log("productId: ",productId)
        //console.log("quantity: ",quantity)
        const orders_products = await createOrdersProducts({orderId, productId, quantity})
        res.send(orders_products)

    }
    catch(error){
        console.error("ERROR-postOrdersProducts by orderId")
        next(error)
     }
})

//PATCH/api/orders_products/quantity/:id
// orders_productsRouter.patch('/quantity/:id',async (req,res,next)=>{
//     try{
//         const {id}=req.params
//         const{quantity}=req.body
//         const passQ = {quantity: quantity}
//         console.log("id: ",id)
//         console.log("quantity: ",passQ)
//         const quantityResponse = await updateOrdersProducts({id,passQ})
//         console.log(quantityResponse)
//     }
//     catch(error){
//         console.error("ERROR-patchOrdersProducts by orderId")
//         next(error)
//      }
// })

//PATCH/api/orders_products/quantity/:id
orders_productsRouter.patch('/quantity/:id',async (req,res,next)=>{
    try{
        const {id}=req.params
        const {quantity}=req.body
        //console.log("id: ",id)
        //console.log("quantity: ",quantity)
        const quantityResponse = await updateOrdersProductsQuantity(id,quantity)
        //console.log("response: ",quantityResponse)
        res.send(quantityResponse)
    }
    catch(error){
        console.error("ERROR-patchOrdersProducts by orderId")
        next(error)
     }
})

//GET /api/orders_products/product/:productId/order/:orderId
orders_productsRouter.get('/product/:productId/order/:orderId',async (req,res,next)=>{
    try{
        const {orderId,productId}=req.params
        //console.log("req.body: ",req.body)
        console.log("orderId: ",orderId," productId: ",productId)
        const orders_productsIdResponse = await getOrdersProductsByProductId(productId,orderId)
        res.send(orders_productsIdResponse)
    }
    catch(error){
        console.error("ERROR-getOrdersProducts by productId")
        next(error)
     }
})



module.exports = orders_productsRouter