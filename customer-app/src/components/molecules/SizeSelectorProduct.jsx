import '../../global.css';
import './styles/molecules.css';

import { useNavigate } from "react-router-dom";

export default function SizeSelectorProduct (props) {
  let navigate = useNavigate();

  const handleSizeChange = async (e) => {
    let selectedSize = e.target.value;
    let productVariation = props.product.productVariations.find((v) => v.size === selectedSize);

    navigate(`/Product/${props.product.id}/ProductVariation/${productVariation.id}`);
  };
    return (
        <div className="size-selector-container">
          <div className="selector-label-container">
            <span>Size: </span>
          </div>
          
          <select className="size-selector" value={props.selectedVariation.size} onChange={(e) => handleSizeChange(e)}>
            {props.productSizeVariations.map((variation) => (
                <option className="size-selector-option" key={variation.id} value={variation.size}>
                {variation.size}
                </option>
            ))}
          </select>
            
          <div className="size-selector-text-container">
            <span className="size-selector-text"></span>
          </div>
      </div>
    );
  };


//   import React, { useState } from 'react';
// import '../../global.css';
// import './styles/molecules.css';
// import { useNavigate } from "react-router-dom";

// export default function SizeSelectorProduct(props) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedSize, setSelectedSize] = useState(props.selectedVariation.size || '');

//   let navigate = useNavigate();

//   const handleSizeChange = (size) => {
//     setSelectedSize(size);
//     setIsDropdownOpen(false);

//     let productVariation = props.product.productVariations.find((v) => v.size === size);
//     navigate(`/Product/${props.product.id}/ProductVariation/${productVariation.id}`);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="size-selector-container">
//       <div className="selector-label-container">
//         <span>Size: </span>
//       </div>

//       <div
//         className="custom-dropdown"
//         onClick={toggleDropdown}
//       >
//         <div className="selected-value">{selectedSize}</div>
//         {isDropdownOpen && (
//           <div className="dropdown-options">
//             {props.productSizeVariations.map((variation) => (
//               <div
//                 key={variation.id}
//                 className="size-selector-option"
//                 onClick={() => handleSizeChange(variation.size)}
//               >
//                 {variation.size}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="size-selector-text-container">
//         <span className="size-selector-text"></span>
//       </div>
//     </div>
//   );
// }
