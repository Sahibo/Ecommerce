import "../../global.css";
import "./styles/molecules.css";
import FavIcon from "../../icons/like_icon.svg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProductCard({ product }) {
  return (
    <div className="productCard-container">
      <div className="card-image-container">
        {product.productVariations && product.productVariations.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${product.productVariations[0].productImages[0].imageData}`}
            alt={`Product Img`}
            className="card-image"
          />
        )}
      </div>

      <div className="card-bottom-container">
        <div className="card-info-container">
          <h5>{product.name}</h5>
          <p>$ {product.productVariations[0].price}</p>
        </div>

        
        <div className="card-favIcon-container">
          <div className="favIcon" alt="Icon" />
        </div>
      </div>
    </div>
  );
}
