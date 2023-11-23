import "../../global.css";
import "./styles/organisms.css";

import ProductCard from "../molecules/ProductCard";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductCards() {
  let products = useSelector((state) => state.products.productsArr);
  console.log(products);

  const navigate = useNavigate();

  const handleProductClick = async (productId, productVariationId, e) => {
    e.preventDefault();

    navigate(`/Product/${productId}/ProductVariation/${productVariationId}`);
  };

  return (
    <div className="productCards-container">
      {products.map((product, index) =>
        product.productVariations.map((productVariation, variationIndex) => (
          <React.Fragment key={variationIndex}>
            <ProductCard product={product} productVariation={productVariation} />
          </React.Fragment>
        ))
      )}
    </div>
  );
}
