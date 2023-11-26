import "../../global.css";
import "./styles/molecules.css";

import { useNavigate } from "react-router-dom";

export default function ColorSelectorProduct(props) {
  let navigate = useNavigate();

  const handleColorChange = async (selectedColor, productVariationId) => {
    console.log(selectedColor);

    navigate(
      `/Product/${props.product.id}/ProductVariation/${productVariationId}`
    );
  };

  return (
    <div className="color-selector-container">
      <div className="selector-label-container">
        <span>Color: </span>
      </div>

      <div className="color-selector-images-container">
        {props.productColorVariations.map((variation) => (
          <img
            key={variation.id}
            onClick={() => handleColorChange(variation.color, variation.id)}
            src={`data:image/jpeg;base64,${variation.productImages[0].imageData}`}
            alt={`Product Img`}
            className={`product-select-image ${
              variation === props.selectedVariation ? "selected-image-item" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
