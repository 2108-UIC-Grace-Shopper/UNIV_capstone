import React from "react";
import axios from "axios"

const AddToCart = (orderId,productId,quantity)=>{
    // const {token,orderId,productId,quantity}=props
    console.log("orderId: ",orderId)
    console.log("productId: ",productId)
    console.log("quantity: ",quantity)
    
    async function addToCart(){
        try{
            let duplicatecheck = false
            const getResponse = await axios.get(`/api/orders_products/order/${orderId}`)
            console.log("getResponse: ",getResponse)

            // getResponse.forEach(function(element){
            //     if(element.id===productId && duplicatecheck===false){
            //         console.log("DO LATER - need patch function to increase quantity in db by amount in quantity state")
            //         duplicatecheck = true
            //     }
            // })
            if(duplicatecheck===false){
                let requiredParams = {
                    productId:productId,
                    quantity:quantity
                }
                console.log("requiredparams: ",requiredParams)
                const postResponse = await axios.post(`/api/orders_products/order/${orderId}`,requiredParams)
                console.log("added ",postResponse.data)
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