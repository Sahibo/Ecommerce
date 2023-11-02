import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../Services/product-service';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export function Products() {  

  let products = useSelector((state) => state.products.productsArr)

  return (
    <div className="main-container">
      <h1>Products</h1>

      {products.map((product, index) => (
        <div key={index}>
          <Link to={`/Product/${product.id}`}><div>{product.id}{product.name}</div></Link>
        </div>
        ))}
    </div>
  );
}
