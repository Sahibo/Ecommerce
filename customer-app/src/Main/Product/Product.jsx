import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../Services/product-service';

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const productService = new ProductService();

    const fetchData = async () => {
        try {
            const product = await productService.getById(id);
            setProduct(product);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchData();
}, [id]);

  return (
    <div className="main-container">
      <h1>Product</h1>

      {product && (
        <div>
          <div>{product.name}</div>
          <div>{product.make}</div>
          <div>{product.gender}</div>
        </div>
      )}
    </div>
  );
}
