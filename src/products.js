import React,{useState,useEffect} from "react";
import axios from "axios"
import AddToCart from "./addorders_products"


const Products = (props) => {
  const {token,orderId}=props

  const[products,setProducts]=useState([])
  const[productId,setProductId]=useState("")
  const[quantity,setQuantity]=useState(1)

  useEffect(()=>{
    const loadProductsData = async()=>{
      //console.log("---start to load data---")
      const allProductsResponse = await axios.get("/api/products")
      //console.log("allProductsResponse: ",allProductsResponse)
      setProducts(allProductsResponse.data)
    }
    loadProductsData()
  },[])
  //console.log("products: ",products)

  function handleAddToCart(productId){
    console.log("---start add to cart---")
    setProductId(productId)
    //have to figure out quantity later
    if(token){
    AddToCart(orderId,productId,quantity)
    }
    else{
      console.log("DO LATER - design guest cart later")
    }
    console.log("---end add to cart---")
  }

     return (
        <div>
          <main>
            <section className="items">
              <h1>Look At Our Amazing Products</h1>
              {products.map(function(element){
                return(
                  <div key={element.id} className="item">
                    <h3 className="item-name"><span>{element.name}</span><i className="add-item material-icons" onClick = {()=>{handleAddToCart(element.id)}}>add_shopping_cart</i></h3>
                    <img className="item-image" src={element.image} alt={element.name}/>
                    <p className="item-description">{element.description}</p>
                    <p className="fact-line"><span className="fact-name">Price:</span><span>{element.price}</span></p>
                  </div>
                )
              })}
            </section>
          </main>
        </div>
      // <div>
      // <main>
      //   <section class="items">
      //     <div class="item">
      //       <h3 class="item-name"><span>Product Name</span><i class="add-item material-icons">add_shopping_cart</i></h3>
      //       <img class="item-image" src="http://placeimg.com/240/200/tech?1" alt="product-name"/>
      //       <p class="item-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est necessitatibus facere fuga aliquam, accusamus quisquam quae temporibus tenetur rerum consequatur numquam blanditiis neque! Molestias, nobis sapiente vero maxime tempora illum!</p>
      //       <p class="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
      //     </div>
      //     <div class="item">
      //       <h3 class="item-name"><span>Product Name</span><i class="add-item material-icons">add_shopping_cart</i></h3>
      //       <img class="item-image" src="http://placeimg.com/240/200/tech?2" alt="product-name" />
      //       <p class="item-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est necessitatibus facere fuga aliquam, accusamus quisquam quae temporibus tenetur rerum consequatur numquam blanditiis neque! Molestias, nobis sapiente vero maxime tempora illum!</p>
      //       <p class="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
      //     </div>
      //     <div class="item">
      //       <h3 class="item-name"><span>Product Name</span><i class="add-item material-icons">add_shopping_cart</i></h3>
      //       <img class="item-image" src="http://placeimg.com/240/200/tech?3" alt="product-name" />
      //       <p class="item-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est necessitatibus facere fuga aliquam, accusamus quisquam quae temporibus tenetur rerum consequatur numquam blanditiis neque! Molestias, nobis sapiente vero maxime tempora illum!</p>
      //       <p class="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
      //     </div>
      //     <div class="item">
      //       <h3 class="item-name"><span>Product Name</span><i class="add-item material-icons">add_shopping_cart</i></h3>
      //       <img class="item-image" src="http://placeimg.com/240/200/tech?4" alt="product-name" />
      //       <p class="item-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est necessitatibus facere fuga aliquam, accusamus quisquam quae temporibus tenetur rerum consequatur numquam blanditiis neque! Molestias, nobis sapiente vero maxime tempora illum!</p>
      //       <p class="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
      //     </div>
      //   </section>

      // </main>
      //   </div>
    );
}
 
export default Products
