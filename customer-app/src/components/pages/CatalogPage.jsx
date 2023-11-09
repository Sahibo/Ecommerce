import '../../global.css';
import './styles/pages.css';

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CatalogPage() {
  let products = useSelector((state) => state.products.productsArr);

  return (
    <div className="catalog-container page-container">
      <h1>Products</h1>

      {products ? (
        products.map((product, index) => {
          const productWithImages = product.productVariations.filter(
            (variation) =>
              variation.productImages && variation.productImages.length > 0
          );

          if (productWithImages.length === 0) {
            return null;
          }

          return (
            <div className="cards-container" key={index}>
              {productWithImages.map((variation, variationIndex) => (
                <Link to={`/ProductVariation/${variation.id}`}>
                  <div className="card" key={variationIndex}>
                    {variation.productImages.length > 0 && (
                      <img
                        src={`data:image/jpeg;base64,${variation.productImages[0].imageData}`}
                        alt={`Product Img`}
                        className="card-img-custom"
                        style={{ height: "350px", width: "220px" }}
                      />
                    )}

                    <div className="card-details">
                      <div style={{ display: "flex" }}>
                        <h4>{product.name}</h4>
                        <span>{variation.name}</span>
                      </div>
                      <p>{variation.price}$</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })
      ) : (
        <p>No products available at the moment.</p>
      )}
    </div>
  );
}
