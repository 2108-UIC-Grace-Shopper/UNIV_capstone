import React from "react";
import axios from "axios"

const AddToCart = async (orderId,productId,quantity,productName)=>{
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
                    alert(`${quantity} ${productName} was added to the cart`)
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
                alert(`${quantity} ${productName} has been added to the cart`)
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
        console.log("ERROR-checkout",error)
        alert("There was an issue checking out")
    }
}

const RemoveFromCart = async (orderId,productId,productName)=>{
    try{
         console.log("UTILS-orderId: ",orderId," productId: ",productId," productName: ",productName)
        // const requiredParams = {productId:productId}
        // console.log("required Params: ", requiredParams)
        const getResponse = await axios.get(`/api/orders_products/product/${productId}/order/${orderId}`)
        console.log("getResponse: ",getResponse.data[0].id)
        const deleteResponse = await axios.delete (`/api/orders_products/${getResponse.data[0].id}`)
        alert(`${productName} has been removed from the cart`)
        return deleteResponse
    }
    catch(error){
        console.log("ERROR-removefromcart",error)
        alert("There was an issue removing your item from the cart")
    }

}

export {AddToCart,Checkout,RemoveFromCart}