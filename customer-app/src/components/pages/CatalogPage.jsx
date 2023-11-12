import "../../global.css";
import "./styles/pages.css";

import ProductCards from "../organisms/ProductCards";

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CatalogPage() {
  let products = useSelector((state) => state.products.productsArr);

  return (
    <div className="catalog-container page-container">
      <h1>Products</h1>
      <ProductCards/>
    </div>
  );
}
