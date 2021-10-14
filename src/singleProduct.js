// import { serialize } from "pg-protocol";
import React from "react";

const SingleProduct = () => {
    return (
        <div>
            <h1>Product Detail</h1>
            <section>
            <h3 className="item-name"><span>Product Name</span>
            <button style={btnStyling}className="add-item material-icons">add_shopping_cart</button></h3>
            <sub className="picure-Description" style={{display: "flex"}}>
            <img className="item-image" src="http://placeimg.com/240/200/tech?1" alt="product-name"/>
            <p style={descriptionBox}className="item-description1">Product Description here</p>
            </sub>
            <p className="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
            
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