const express = require('express')
const { getAllProducts, getProductById } = require('../db')
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
        console.error("ERROR-ALLPRODUCTS",error)
        next(error)
    }
})



module.exports = productsRouter