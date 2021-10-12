const express = require('express')
const orders_productsRouter = express.Router()
const { createOrdersProducts,
    getOrdersProductsById,
    updateOrdersProducts,
    deleteOrdersProducts,
    getOrderById}
    = require('../db')
const { requireUser } = require('./utils')

orders_productsRouter.get('/', async (req, res, next) => {
    try{
        const currentOrder = await getOrderById(id)
        if (!currentOrder.status){
            res.send({
                currentOrder
            })
        } else {
            next({ name: 'Order has been checked out',
                    message: 'Create new order'})
        }
    } catch({ name, message}){
        next({name, message})
    }
})

orders_productsRouter.patch('/:orders_productsId', requireUser, async(req, res, next) => {    
    const { orders_productsId } = req.params 
    const { quantity } = req.body
    
    const  updateFields = {}

    if (quantity) {
        updateFields.quantity = quantity
    }
    try{
        const originalOrder = await getOrdersProductsById()

        if (originalOrder.orders.usersId === req.req.user.id){
            const updatedOrder = await updateOrdersProducts(orders_productsId)   
            res.send ({
                updatedOrder
            })
        } else {
            next({
                name: 'Unauthorized user',
                message: 'You cannot update order'
            })
        }
    }catch({name, message}){
        console.error("ERROR-orders_productsRouter PATCH")
        next({ name, message})
    }    
 }
)

orders_productsRouter.delete('/:orders_productsId', requireUser, async (req, res, next) => {
    try{
        const { orders_productsId } = req.params
        const order = await getOrdersProductsById(orders_productsId )
        if (!order) {
            next({
            name: 'Not Found',
            message: `Order not found by ID ${orders_productsId}`
            })
        } else {
            const deleteOrder = await deleteOrdersProducts(orders_productsId)
            res.send({
                deleteOrder
            })
        }
    } catch({name, message}){
        console.error('ERROR-orders_productsRouter DELETE')
        next({name, message})
    }
})

module.exports = orders_productsRouter












