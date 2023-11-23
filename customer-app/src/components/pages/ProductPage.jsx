import "../../global.css";
import "./styles/pages.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

import SizeSelectorProduct from "../molecules/SizeSelectorProduct"

export default function ProductPage() {
  let dispatch = useDispatch();
  
  let product = useSelector((state) => state.products.selectedProduct);
  
  let { productId, productVariationId } = useParams();
  let selectedVariation;

  let [productVariations, setProductVariations] = useState([]);
  
  let [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId, productVariationId]); 

  if (product && product.productVariations) {
    selectedVariation = product.productVariations.find(
      (v) => v.id === parseInt(productVariationId, 10)
    );
  }

  if (selectedVariation) {
    productVariations = product.productVariations.filter((v) => v.color === selectedVariation.color);
  } else {
    // Handle the case where selectedVariation is not available
    productVariations = [];
  }
  // console.log(productVariations);
  // productVariations = product.productVariations.filter((v) => v.color === selectedVariation.color);
  // console.log(productVariations);
  const handleImageClick = async (index) => {
    setMainImage(index);
  };


  return (
    <div className="product-page-container page-container">
      {product && selectedVariation && (
        <div className="product-container">
          <div className="product-images-container">
            <div className="product-main-image-container">
              <img
                src={`data:image/jpeg;base64,${selectedVariation.productImages[mainImage].imageData}`}
                alt={`Product Img`}
                className="product-main-image"
              />
            </div>

            <div className="product-thumbnails-container">
              {selectedVariation.productImages.map((image, index) => (
                <div key={index} className={`product-thumbnail ${index === mainImage ? "selected" : ""}`}
                    onClick={() => handleImageClick(index)}>

                  <img src={`data:image/jpeg;base64,${image.imageData}`} alt={`Product Thumbnail ${index + 1}`}
                    className="product-thumbnail-image"/>
                </div>
              ))}
            </div>
          </div>

          <div className="product-info-container">
            <h2>{product.name}</h2>
            <span>$ {selectedVariation.price}</span>

            <SizeSelectorProduct product={product} productVariations={productVariations} selectedVariation={selectedVariation}/>

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
