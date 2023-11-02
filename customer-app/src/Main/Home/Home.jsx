import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Products } from '../Products';
import React, { useEffect, useState } from 'react';
import ProductService from '../../Services/product-service';
import { useDispatch, useSelector} from "react-redux";
import {getAll, getByGender} from '../../store/reducer'

export function Home() {
  const navigate = useNavigate()
  let dispatch = useDispatch()

  const handleAllProductsClick = async (e) => {
    e.preventDefault();
    console.log("Start");
    await dispatch(getAll())
    console.log("end");
    navigate(`Product`)
  };

  const handleGenderClick = async(gender, e) => {
    e.preventDefault();
    await dispatch(getByGender(gender))
    navigate(`Product/Gender/${gender}`)
  };
  

  return (
    <div className="main-container">
      <Link onClick={(e) => handleAllProductsClick(e)}>Show all</Link>

      <div className="select-gender-container">
        <div className="gender-container">
          <Link onClick={(e) => handleGenderClick('1', e) }>Man</Link>
        </div>

        <div className="gender-container">
          <Link onClick={(e) => handleGenderClick('2', e)}>Woman</Link>
        </div>
      </div>

      <div className="recommended-categories-container">
        <ul className="recommended-categories-list">
          {/* {parentCategories.map(parentCategory => (
            <li className="recommended-categories-item" key={parentCategory.id}>
              <div>
                <Link onClick={(e) => handleParentCategoryClick('1', e)}>{parentCategory.name}</Link>
              </div>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
