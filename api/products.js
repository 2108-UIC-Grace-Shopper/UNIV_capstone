const express = require('express')
const { getAllProducts, getProductById, getProductsByOrderId } = require('../db')
const productsRouter = express.Router()

//GET /api/products
productsRouter.get("/", async (req,res,next)=>{
    try{
        const products = await getAllProducts()
        res.send(products)
    }
    catch(error){
        console.error("ERROR-ALLPRODUCTS ",error)
        next(error)
    }
})

// //GET /api/products/:productId
productsRouter.get("/:id", async (req,res,next)=>{
    try{
        //console.log("starting get product")
        const {id} = req.params
        //console.log("productId: ",id)
        const product = await getProductById(id)
        //console.log("product: ",product)
        res.send(product)
    }
    catch(error){
        console.error("ERROR-PRODUCTBYID",error)
        next(error)
    }
})

productsRouter.get("/orders/orderId", async (req,res,next)=>{
    try{
        const {id}=req.params
        const products=await getProductsByOrderId(id)
        res.send(products)
    }
    catch(error){
        console.error("ERROR-PRODUCTBYORDERID",error)
        next(error)
        
    }
})



module.exports = productsRouter