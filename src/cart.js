
import React,{useState,useEffect} from "react";
import axios from "axios"
import { Checkout,RemoveFromCart } from "./utils";

const Cart = (props) => {
  const {token,orderId,setOrderId,user,productId,setProductId} = props
  //console.log("props-orderId: ",orderId)
  //console.log(`/api/products/order/${orderId}`)

  const [orderProducts,setOrderProducts]=useState([])
  
  
  useEffect(()=>{
    const loadOrderProductsData = async()=>{
      console.log("---start to load data---")
      //console.log("orderId: ",orderId)
      const orderProductsResponse = await axios.get(`/api/products/order/${orderId}`)
      //console.log("orderProductsResponse: ",orderProductsResponse)
      setOrderProducts(orderProductsResponse.data)
    }
    if(orderId){
      loadOrderProductsData()
    }
    else if(!orderId){
      console.log("no orderId")
      setOrderProducts([])
    }
  },[orderId,productId])
  //console.log("orderProducts: ",orderProducts)
  //console.log("orderProducts.length: ",orderProducts.length)

  let totalCalc = 0

  const handleCheckout = async ()=>{
    if(orderProducts.length > 0){
      let newOrder=await Checkout(orderId,user.id)
      console.log("newOrder: ",newOrder)
      setOrderId(newOrder)
    }
    else{
      console.log("No Items in Cart")
      alert("Notice: There are no items in your cart")
    }
  }

  const handleRemove = async (elementproductId,elementproductName)=>{
    console.log("orderId: ",orderId," productId: ",elementproductId," productName: ",elementproductName)
    //setProductId(elementproductId)
    //console.log("STATE-productId: ",productId)
    let deleteProduct = await RemoveFromCart(orderId,elementproductId,elementproductName)
    console.log("deletedItem: ",deleteProduct)
    setProductId(elementproductId)
  }
  
    return (
        <div>
            <h1>Welcome to the Cart!</h1>
            <div className ="cart-containter">
            {orderProducts.map(function(element){
              totalCalc = totalCalc+Number(element.price * element.quantity)
              return(
                <section key={element.id} className="item1">
                  <img src= {element.image} height="100px" width="100px"/>
                  <p id="itemDescription" name="item-1" rows="6" cols="50">{element.name}</p>
                  <p id="itemQuantity">Qty: {element.quantity}</p>
                  <sub id="priceRemove">
                  <p className="itemPrice">Price: ${element.price * element.quantity}</p>
                  <button className="RemoveItem" onClick={()=>{handleRemove(element.id,element.name)}}>Remove</button>
                  </sub>
                </section>
                )
              })}
            </div>
    {/* <!-- start of checkout section --> */}
            <nav className="checkout-description">
              <p className="totalPrice">Total: ${totalCalc}</p>
              <button type="submit" onClick={()=>{handleCheckout()}}>Checkout</button>
            </nav>
        </div>
    //         <div>
    //         <h1>Welcome to the Cart!</h1>
    //         <div class ="cart-containter">
    //           <section class="item1">
    //             <img src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2016/02/16/1331777047411_1/a-pair-of-mountain-bikers-riding-in-the-dolomites-range-in-north-eastern-italy" height="100px" width="100px"/>
    //             <p id="itemDescription" name="item-1" rows="6" cols="50">
    //             Description of your purchase here!
    //             </p>
    //             <sub id="priceRemove">
    //             <p class="itemPrice">Price: </p>
    //             <button class="RemoveItem">Remove</button>
    //             </sub>
    //           </section>
    // {/* <!-- start of checkout section --> */}
    //         </div>
    //           <nav class="checkout-description">
    //             <p class="totalPrice">Total: </p>
    //             <button type="submit">Checkout</button>
    //           </nav>
    //         </div>
    )
}
// import react from "react";

// const Cart = () => {
//     return (
//         <div>
//                 <h1>Welcome to the Cart!</h1>
//     <div class ="cart-containter">
//       <section class="item1">
//         <img src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2016/02/16/1331777047411_1/a-pair-of-mountain-bikers-riding-in-the-dolomites-range-in-north-eastern-italy" height="100px" width="100px"/>
//         <p id="itemDescription" name="item-1" rows="6" cols="50">
//          Description of your purchase here!
//         </p>
//         <sub id="priceRemove">
//         <p class="itemPrice">Price: </p>
//         <button class="RemoveItem">Remove</button>
//         </sub>
//       </section>

      
//     {/* <!-- start of checkout section --> */}
//     </div>
//       <nav class="checkout-description">
//         <p class="totalPrice">Total: <p>
//         {/* <button type="submit">Checkout</button> */}
        
//       {/* </nav>
// //         </div> */}
//     )
// }


export default Cart
