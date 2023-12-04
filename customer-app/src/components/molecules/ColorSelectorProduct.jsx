import "../../global.css";
import "./styles/molecules.css";
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from "react-router-dom";

export default function ColorSelectorProduct() {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  let selectedProduct = useSelector((state) => state.products.selectedProduct);
  let selectedVariation = useSelector((state) => state.products.selectedVariation);

  let handleColorChange = async (selectedColor, productVariationId) => {
    navigate(`/Product/${selectedProduct.id}/ProductVariation/${productVariationId}`);
  };

  return (
    <div className="color-selector-container">
      <div className="selector-label-container">
        <span>Color: </span>
      </div>

      <div className="color-selector-images-container">
        {selectedProduct?.productVariations?.map((variation) => (
          <img
            key={variation.id}
            onClick={() => handleColorChange(variation.color, variation.id)}
            src={`data:image/jpeg;base64,${variation.productImages[0].imageData}`}
            alt={`Product Img`}
            className={`product-select-image 
              ${variation === selectedVariation ? "selected-image-item" : ""}`}/>
          ))}
      </div>
    </div>
  );
}
