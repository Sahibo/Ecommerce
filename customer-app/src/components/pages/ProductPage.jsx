import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductPage() {

  const { id } = useParams();
  let dispatch = useDispatch()
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultAction = await dispatch(getById(id));
 
        if (getById.fulfilled.match(resultAction)) {
          const productData = resultAction.payload;
          setProduct(productData);
        } else if (getById.rejected.match(resultAction)) {
          console.error('Error while recieving data', resultAction.error.message);
        }
      } catch (error) {
        console.error('Error when fetching getById:', error);
      }
    };
 
    fetchData();
  }, [id, dispatch]);
 
  console.log(product)
  return (
    <div className="main-container">
      <div>
        <h3>{product.name}</h3>
        <span>{product.variation.name}</span>
      </div>
 
      {product && (
        <div>
          <ul>
            <li>{product.name}</li>
            <li>{product.make}</li>
            <li>{product.description}</li>
            <li>{product.gender}</li>
            <li>{product.fabric}</li>
          </ul>
        </div>
      )}
    </div>
  );
}