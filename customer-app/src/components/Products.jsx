import React, { useEffect, useState } from 'react';

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://localhost:44363/Customer/Home/GetAllProducts') // Update URL according to your API endpoint
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-container">
      <h1>Products</h1>
      {/* Render products using the retrieved data */}
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}