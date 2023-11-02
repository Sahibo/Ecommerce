import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Products() {
  //const [products, setProducts] = useState([]);
  
  // const { param } = useParams();
  // console.log(param);
  // useEffect(() => {
  //   fetch(`https://localhost:44313/Product/Gender/${gender}`) //pomenyat
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data);
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [gender]);
  // useEffect(() => {
  //   fetch(`https://localhost:44313/ParentCategory/${param}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data);
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [param]);

  
  // const { id } = useParams(); // Use the same parameter name as defined in the route

  // useEffect(async () => {
  //   fetch(`https://localhost:44313/ParentCategory/${id}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setProducts(data);
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  // }, [id]);

  // console.log('products');
  // console.log(products);

  const [products, setProducts] = useState([]);
  const { gender, id } = useParams(); // Use the same parameter name as defined in the route

  useEffect(() => {
    if (gender) {
      fetch(`https://localhost:44313/Product/Gender/${gender}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (id) {
      fetch(`https://localhost:44313/ParentCategory/${id}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log(products);
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [gender, id]);

  return (
    <div className="main-container">
      <h1>Products</h1>

      {products.map((product, index) => (
        <div key={index} >
          <div>{product.name}</div>
          
        </div>
        ))}
    </div>
  );
}
