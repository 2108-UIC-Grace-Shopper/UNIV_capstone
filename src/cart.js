import React,{useState,useEffect} from "react";
import axios from "axios"

const Cart = (props) => {
  const {token,orderId} = props
  //console.log("props-orderId: ",orderId)
  //console.log(`/api/products/order/${orderId}`)

  const [orderProducts,setOrderProducts]=useState([])
  
  
  useEffect(()=>{
    const loadOrderProductsData = async()=>{
      console.log("---start to load data---")
      const orderProductsResponse = await axios.get(`/api/products/order/${orderId}`)
      //console.log("orderProductsResponse: ",orderProductsResponse)
      setOrderProducts(orderProductsResponse.data)
    }
    if(orderId){
      loadOrderProductsData()
    }
  },[orderId])
  console.log("orderProducts: ",orderProducts)
  
    return (
        <div>
            <h1>Welcome to the Cart!</h1>
            <div className ="cart-containter">
            {orderProducts.map(function(element){
              return(
                <section key={element.id} className="item1">
                  <img src= {element.image} height="100px" width="100px"/>
                  <p id="itemDescription" name="item-1" rows="6" cols="50">{element.description}</p>
                  <sub id="priceRemove">
                  <p className="itemPrice">Price: {element.price}</p>
                  <button className="RemoveItem">Remove</button>
                  </sub>
                </section>
                )
              })}
            </div>
    {/* <!-- start of checkout section --> */}
            <nav className="checkout-description">
              <p className="totalPrice">Total: </p>
              <button type="submit">Checkout</button>
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

export default Cart