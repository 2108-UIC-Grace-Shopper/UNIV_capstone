const express = require('express')
const orders_productsRouter = express.Router()
const { createOrdersProducts,
    getOrdersProductsById,
    updateOrdersProducts,
    deleteOrdersProducts}
    = require('../db')
const { requireUser } = require('./utils')

//GET /api/orders_products
orders_productsRouter.get('/:id', requireUser, async (req, res, next) => {
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
orders_productsRouter.delete('/:id', requireUser, async (req, res, next) => {
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


module.exports = orders_productsRouter