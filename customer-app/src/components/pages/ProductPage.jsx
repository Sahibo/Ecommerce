import "../../global.css";
import "./styles/pages.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";


export default function ProductPage() {
  let dispatch = useDispatch();
  let product = useSelector((state) => state.products.selectedProductsArr);

  let { productId, productVariationId } = useParams();
  let productVariation;
  let [mainImage, setMainImage] = useState(0);
  
  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch]);

  if (product && product.productVariations) {
    productVariation = product.productVariations.find(
      (v) => v.id === parseInt(productVariationId, 10)
    );
  }

  const handleImageClick = (index) => {
    setMainImage(index);
  };

  return (
    <div className="product-page-container page-container">
      {product && productVariation && (
        <div className="product-container">
          <div className="product-images-container">
            <div className="product-main-image-container">
              <img
                src={`data:image/jpeg;base64,${productVariation.productImages[mainImage].imageData}`}
                alt={`Product Img`}
                className="product-main-image"
              />
            </div>

            <div className="product-thumbnails-container">
              {productVariation.productImages.map((image, index) => (
                <div
                  key={index}
                  className={`product-thumbnail ${index === mainImage ? "selected" : ""}`}
                  onClick={() => handleImageClick(index)}>
                  
                  <img
                    src={`data:image/jpeg;base64,${image.imageData}`}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="product-thumbnail-image"/>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>{product.name}</h3>
            <span>{productVariation.name}</span>

            <ul>
              <li>{product.name}</li>
              <li>{product.make}</li>
              <li>{product.description}</li>
              <li>{product.gender}</li>
              <li>{product.fabric}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
