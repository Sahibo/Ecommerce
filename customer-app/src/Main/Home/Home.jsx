import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Products } from '../Products';
import React, { useEffect, useState } from 'react';

export function Home() {
  const navigate = useNavigate()

  const handleGenderClick = (selectedGender, e) => {
    e.preventDefault();
    navigate(`/Product/Gender/${selectedGender}`)
  };

  const handleParentCategoryClick = (selectedParentCategory, e) => {
    e.preventDefault();
    console.log(selectedParentCategory);
    navigate(`/ParentCategory/${selectedParentCategory}`)
  };

  const [parentCategories, setParentCategories] = useState([])

  useEffect(() => {
    
    fetch('https://localhost:44313/ParentCategory')
      .then(response => response.json())
      .then(data => {
        setParentCategories(data);
      })
      .catch(error => {
        console.error('Error fetching Parent Categories:', error);
      });
  }, []);

  return (
    <div className="main-container">
      <Link to='/Product'>Show all</Link>

      <div className="select-gender-container">
        <div className="gender-container">
          <Link onClick={(e) => handleGenderClick('1', e)}>Man</Link>
        </div>

        <div className="gender-container">
          <Link onClick={(e) => handleGenderClick('2', e)}>Woman</Link>
        </div>
      </div>

      <div className="recommended-categories-container">
        <ul className="recommended-categories-list">
          {parentCategories.map(parentCategory => (
            <li className="recommended-categories-item" key={parentCategory.id}>
              <div>
                <Link onClick={(e) => handleParentCategoryClick('1', e)}>{parentCategory.name}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
//{parentCategory: `${parentCategory.id}`}