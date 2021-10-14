import React from "react";
import axios from "axios"

const AddToCart = (orderId,productId,quantity)=>{
    // const {token,orderId,productId,quantity}=props
    //console.log("orderId: ",orderId)
    //console.log("productId: ",productId)
    //console.log("quantity: ",quantity)
    
    async function addToCart(){
        try{
            let duplicatecheck = false
            const getResponse = await axios.get(`/api/orders_products/order/${orderId}`)
            console.log("getResponse: ",getResponse.data)

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
                console.log("duplicatecheck: ",duplicatecheck)
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
        addToCart()
}

export default AddToCart