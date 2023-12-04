import React, { useEffect, useState } from 'react';
import '../../global.css';
import './styles/molecules.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSubVariation } from '../../store/reducer';

export default function SizeSelectorProduct() {
  let [isDropdownOpen, setDropdownOpen] = useState(false);
  let dispatch = useDispatch()
  let selectedVariation = useSelector((state) => state.products.selectedVariation);
  let selectedSubVariation = useSelector((state) => state.products.selectedSubVariation);

  useEffect(() => 
  {
    dispatch(setSelectedSubVariation(selectedVariation.subProductVariations?.[0]))
  }, [selectedVariation])

  const handleSizeChange = (size) => {
    toggleDropdown(false);
    
    let subVariation = selectedVariation.subProductVariations.find((v) => v.size === size);
    dispatch(setSelectedSubVariation(subVariation))
    
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="size-selector-container">
      <div className="selector-label-container">
        <span>Size: </span>
      </div>

      <div className="custom-dropdown">
        <ul onClick={toggleDropdown}>
          <li className="selected-header">
            <span>{selectedSubVariation?.size}</span>
          </li>
          {isDropdownOpen && (
            <div className="dropdown-options">
              {selectedVariation?.subProductVariations?.map((variation) => (
                <li key={variation.id} className="size-selector-option" onClick={() => handleSizeChange(variation.size)}>
                  <span>{variation.size}</span>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>

      <div className="size-selector-text-container">
        <span className="size-selector-text"></span>
      </div>
    </div>
  );
}
