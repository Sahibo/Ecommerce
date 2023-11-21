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
  let [productVariationTest, setProductVariationTest] = useState({});
  let [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch]);
  
  if (product && product.productVariations) {
    productVariation = product.productVariations.find(
      (v) => v.id === parseInt(productVariationId, 10)
      );
      console.log(productVariation)
    }
    
  const handleImageClick = async (index) => {
    setMainImage(index);
  };

  const handleSizeChange = async (e) => {
    const selectedSize = e.target.value;
    const productVariation = product.productVariations.find((v) => v.size === selectedSize);
    productVariationId = productVariation.id;
    setProductVariationTest(productVariation);  
    console.log(productVariationTest)
  };
  console.log(productVariation)
  console.log(productVariationId)

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
                  className={`product-thumbnail ${
                    index === mainImage ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={`data:image/jpeg;base64,${image.imageData}`}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="product-thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info-container">
            <h2>{product.name}</h2>
            <span>$ {productVariation.price}</span>

            <div className="size-selector">
              <select value={productVariation.size} onChange={(e) => handleSizeChange(e)}>
                {product.productVariations.map((variation) => (
                  <option key={variation.id} value={variation.size}>
                    {variation.size}
                  </option>
                ))}
              </select>
              <div className="arrow-down"></div>
            </div>

            <div className="product-info-buttons-container">
              <div className="product-button-addToBag-container"></div>

              <div className="product-button-addToFav-container"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
