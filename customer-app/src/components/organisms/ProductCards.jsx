import '../../global.css'
import './styles/organisms.css'

import ProductCard from "../molecules/ProductCard"

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
 
export default function ProductCards() {
  let products = useSelector((state) => state.products.productsArr);

  return (
    <div className="productCards-container">
      {products.map((product, index) => (
          <Link to={`/ProductVariation/${product.id}`} key={index}>
            <ProductCard product={product}/>
          </Link>
        ))}
    </div>
  );
}

