import React from "react";
import axios from "axios"

const AddToCart = async (orderId,productId,quantity)=>{
        try{
            let duplicatecheck = false
            const getResponse = await axios.get(`/api/orders_products/order/${orderId}`)
            //console.log("getResponse: ",getResponse.data)

            getResponse.data.forEach(async function(element){
                //console.log("getProductId: ",element.id)
                //console.log("matchProductId",productId)
                if(element.productId===productId && duplicatecheck===false){
                    duplicatecheck=true
                    let newQuantity = {quantity: element.quantity+quantity}
                    //console.log("newQuantity: ",newQuantity)
                    const addQuantity = await axios.patch(`/api/orders_products/quantity/${element.id}`,newQuantity)
                    //console.log("addQuantity",addQuantity)
                }
            })
            if(duplicatecheck===false){
                //console.log("duplicatecheck: ",duplicatecheck)
                let requiredParams = {
                    productId:productId,
                    quantity:quantity
                }
                //console.log("requiredparams: ",requiredParams)
                const postResponse = await axios.post(`/api/orders_products/order/${orderId}`,requiredParams)
                //console.log("added ",postResponse.data)
            }
        }
        catch(error){
            console.log("ERROR-addtocart",error)
            alert("There was an issue adding this item to your cart")
        }
}

const Checkout =async (orderId,userId)=>{
    try{
        console.log("UTILS: orderId: ",orderId," userId",userId)
        const requiredParams = {status:true}
        const endCurrentOrder = await axios.patch(`/api/orders/${orderId}`,requiredParams)
        console.log("updateCurrentOrder: ",endCurrentOrder)
        const startNewOrder = await axios.post(`/api/orders/users/${userId}`)
        console.log("startNewOrder: ",startNewOrder.data.id)
        return startNewOrder.data.id
    }
    catch(error){
        console.log("ERROR-addtocart",error)
        alert("There was an issue checking out")
    }
}

export {AddToCart,Checkout}