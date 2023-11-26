import "../../global.css";
import "./styles/organisms.css";

import ProductCard from "../molecules/ProductCard";

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, getProductsByCategoryId, getProductByGender } from "../../store/reducer";

export default function ProductCards() {
  const { gender, id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsArr) || [];

  useEffect(() => {
    if (gender) {
      dispatch(getProductByGender(gender));
    } else if (id) {
      dispatch(getProductsByCategoryId(id));
    } else {
      dispatch(getAllProducts());
    }
  }, [dispatch, gender, id]);

  return (
    <div className="productCards-container">
      {products.map((product, index) =>
        product && product.productVariations ? (
          product.productVariations.map((productVariation, variationIndex) => (
            <React.Fragment key={variationIndex}>
              <ProductCard product={product} productVariation={productVariation} />
            </React.Fragment>
          ))
        ) : null
      )}
    </div>
  );
}
