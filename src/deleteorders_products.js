import React,{useState,useEffect} from "react";
import axios from "axios"
import Products from "./products";

const onRemove = (orderProducts) => {
    const exist = orderProducts.find((x) => x.id === Products.id)
    if (exist.quantity === 1) {
        setOrderProducts(orderProducts.filter((x) => x.id !== Products.id))
    } 
}

export default onRemove