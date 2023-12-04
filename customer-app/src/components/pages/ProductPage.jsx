import "../../global.css";
import "./styles/pages.css";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addToBag, newSetSelectedVariation} from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

import SizeSelectorProduct from "../molecules/SizeSelectorProduct";
import ColorSelectorProduct from "../molecules/ColorSelectorProduct";

export default function ProductPage() {
  let dispatch = useDispatch();
  
  let { productId, productVariationId } = useParams();
  
  let product = useSelector((state) => state.products.selectedProduct);
  let selectedVariation = useSelector((state) => state.products.selectedVariation);
  let selectedSubVariation = useSelector((state) => state.products.selectedSubVariation);
  
  
  let [mainImage, setMainImage] = useState(0);

  //let [productSizeVariations, setProductSizeVariations] = useState([]);
  //let [productColorVariations, setProductColorVariations] = useState([]);
  //let [uniqueColorVariations, setUniqueColorVariations] = useState([]);





  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductById(productId));
    };

    fetchData();
  }, [dispatch, productId]);

  useEffect(() => {
    const fetchData = async () => {
      if (product && product.productVariations && productVariationId) {
        try {
          const initialSelectedVariation = product.productVariations.find(
            (v) => v.id === parseInt(productVariationId, 10)
          );

          if (initialSelectedVariation) {
            dispatch(newSetSelectedVariation(initialSelectedVariation));
          }
        } catch (error) {
          console.error("Error fetching variation data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, product, productVariationId]);

  // useEffect(() => {
  //   if (selectedVariation) {
  //     const selectedColor = selectedVariation.color;
  //     const selectedProductId = selectedVariation.productId;
  //     if (product.productVariations) {
  //       productSizeVariations = product.productVariations.filter(
  //         (v) => v.color === selectedColor
  //       );
  //       productColorVariations = product.productVariations.filter(
  //         (v) => v.productId === selectedProductId
  //       );
  //     } else {
  //       productSizeVariations = [];
  //       productColorVariations = [];
  //     }
  //   } else {
  //     productSizeVariations = [];
  //     productColorVariations = [];
  //   }
  // }, [dispatch, selectedVariation, product]);

  // useEffect(() => {
  //   if (product.productVariations) {
  //     productColorVariations = product.productVariations.flatMap(
  //       (variation) => {
  //         if (!productColorVariations.includes(variation.color)) {
  //           return variation.color;
  //         }
  //       }
  //     );

  //     console.log(productColorVariations);
  //   }
  // }, [product]);

  const addItem = (id) => {
    dispatch(addToBag(id));
  };

  const handleImageClick = async (index) => {
    console.log(mainImage);
    setMainImage(index);
  };

  return (
    <div className="product-page-container page-container">
      {product && selectedVariation ? (
        <div className="product-container">
          <div className="product-images-container">
            <div className="product-main-image-container">
              <img
                src={`data:image/jpeg;base64,${selectedVariation?.productImages?.[mainImage]?.imageData}`}
                alt={`Product Img`}
                className="product-main-image"
              />
            </div>
            <div className="product-thumbnails-container">
              {selectedVariation.productImages?.map((image, index) => (
                <div
                  key={index}
                  className={`product-thumbnail ${
                    index === mainImage ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={`data:image/jpeg;base64,${image?.imageData}`}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="product-thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info-container">
            <h1>
              {product.make}: {product.name}
            </h1>

            <h2>$ {selectedSubVariation?.totalPrice}</h2>
            
            <ColorSelectorProduct/>
            <SizeSelectorProduct/>

            <div className="product-info-buttons-container">
              <div className="product-button-addToBag-container">
                <div className="product-button-addToBag-button" onClick={() => addItem(productVariationId)}>
                  <span>Add to bag</span>
                </div>
              </div>

              <div className="product-button-addToFav-container">
                <div className="product-button-addToFav-button">
                  <div className="favIcon" alt="Icon"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
