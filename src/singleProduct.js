// import { serialize } from "pg-protocol";
import React from "react";

const SingleProduct = () => {
    return (
        <div>
            <h1>Product Detail</h1>
            <section>
            <h3 className="item-name"><span>Product Name</span>
            <button style={btnStyling}className="add-item material-icons">add_shopping_cart</button></h3>
            <img className="item-image" src="http://placeimg.com/240/200/tech?1" alt="product-name"/>
            <p className="item-description">Product Description here</p>
            <p className="fact-line"><span class="fact-name">Price:</span><span>$27.99</span></p>
            </section>
        </div>

    );
}
const btnStyling = {
    color: "white",
    borderRadius: "100%"

}
export default SingleProduct;