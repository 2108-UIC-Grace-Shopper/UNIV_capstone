// import { serialize } from "pg-protocol";
import React,{useState,useEffect} from "react";
import axios from "axios";
import {AddToCart} from "./utils"

const SingleProduct = (props) => {
    const {token,orderId,productId,setProductId}=props
    const [product,setProduct]=useState([])
    const[quantity,setQuantity]=useState(1)

    useEffect(()=>{
        console.log(productId)
        const loadProductsData = async()=>{
            console.log("---start to load data---")
            const productResponse = await axios.get(`/api/products/${productId}`)
            console.log("productResponse: ",productResponse.data)
            setProduct(productResponse.data)
          }
          loadProductsData()
    },[])

    const handleAddToCart = (productId,productName)=>{
        console.log("---start add to cart---")
        setProductId(productId)
        //have to figure out quantity later
        if(token){
        AddToCart(orderId,productId,quantity,productName)
        }
        else{
          console.log("DO LATER - design guest cart later")
          alert("Guest cart is not available at this time")
        }
        console.log("---end add to cart---")
      }

    return (
        <div>
            <h1>Product Detail</h1>
            <section>
            <h3 className="item-name"><span>{product.name}</span>
            <button style={btnStyling}className="add-item material-icons" onClick = {()=>{handleAddToCart(product.id,product.name)}}>add_shopping_cart</button></h3>
            <sub className="picure-Description" style={{display: "flex"}}>
            <img className="item-image" src={product.image} alt="product-name"/>
            <p style={descriptionBox}className="item-description1">{product.description}</p>
            </sub>
            <p className="fact-line"><span className="fact-name">Price:</span><span>{product.price}</span></p>
            
            </section>
        </div> 

    );
}
const descriptionBox = {
    border: '1px solid black',
    height: "150px",
    fontSize: "20px",
    borderWidth:"",
    margin: "20px",
    
    
}
const btnStyling = {
    color: "white",
    borderRadius: "100%",
    height: "50px",
    width: "50px",
    backgroundColor: "Green"
}
export default SingleProduct;