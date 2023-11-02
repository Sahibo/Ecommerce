import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../Services/product-service';
import { Link } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const productService = new ProductService();

    const fetchData = async () => {
        try {
            const productList = await productService.getAll();
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchData();
}, []);


  return (
    <div className="main-container">
      <h1>Products</h1>

      {products.map((product, index) => (
        <div key={index} >
          <Link to={`/Product/${product.id}`}><div>{product.id}{product.name}</div></Link>
        </div>
        ))}
    </div>
  );
}
