import "../../global.css";
import "./styles/pages.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, addToBag } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

import SizeSelectorProduct from "../molecules/SizeSelectorProduct"
import ColorSelectorProdut from "../molecules/ColorSelectorProdut"

export default function ProductPage() {
  let dispatch = useDispatch();
  
  let product = useSelector((state) => state.products.selectedProduct);
  
  let { productId, productVariationId } = useParams();
  let selectedVariation;

  let [productSizeVariations, setProductSizeVariations] = useState([]);
  let [productColorVariations, setProductColorVariations] = useState([]);

  let [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId, productVariationId]); 

  const addItem = (id) =>
  {
    dispatch(addToBag(id))
  }

  if (product && product.productVariations) {
    selectedVariation = product.productVariations.find(
      (v) => v.id === parseInt(productVariationId, 10)
    );
  }

  if (selectedVariation) {
    productSizeVariations = product.productVariations.filter((v) => v.color === selectedVariation.color);
    productColorVariations = product.productVariations.filter((v) => v.productId === selectedVariation.productId);

  } else {
    productSizeVariations = [];
    productColorVariations = [];
  }
  
  if (product.productVariations && Array.isArray(product.productVariations)) {
    productColorVariations = product.productVariations.reduce((result, currentObject, index, array) => {
        const isUniqueColor = array.slice(0, index).every(obj => obj.color !== currentObject.color);

        if (isUniqueColor || index === 0) {
            result.push(currentObject);
        }

        return result;
    }, []);
  } else {
      // Handle the case when product.productVariations is not defined or not an array
      console.error("product.productVariations is not defined or not an array");
  }

  console.log(productColorVariations);
  //console.log(productColorVariations);
  
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
                alt={`Product Img`} className="product-main-image"/>
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
            <h1>{product.make}: {product.name}</h1>
            <h2>$ {selectedVariation.price}</h2>

            <ColorSelectorProdut product={product} productColorVariations={productColorVariations} selectedVariation={selectedVariation}/>

            <SizeSelectorProduct product={product} productSizeVariations={productSizeVariations} selectedVariation={selectedVariation}/>

            <div className="product-info-buttons-container">
              <div className="product-button-addToBag-container">
                <button onClick={() => addItem(productVariationId)}>Add to bag</button>
              </div>

              <div className="product-button-addToFav-container">
                <button>Add to fav</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
