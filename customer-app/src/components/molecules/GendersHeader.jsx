import '../../global.css';

import React from 'react';
import { getProductByGender, getParentCategoriesByGender, clearCategories } from '../../store/reducer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";

export default function GendersHeader ({ handleMouseEnter }) {
    const navigate = useNavigate()
    let dispatch = useDispatch()
    const gender = useSelector((state) => state.gender);

    const handleGenderClick = async(gender, e) => {
        e.preventDefault();
        await dispatch(getProductByGender(gender))
        navigate(`Product/Gender/${gender}`)
      };

    const handleGenderMouseEnter = (gender) => {
        dispatch(clearCategories());
        dispatch(getParentCategoriesByGender(gender));
        handleMouseEnter();
    };
    
    return (
        <div className='genders-container container'>
            <ul className='genders-list list'>
                <li className='gender-item item'>
                    <Link onClick={(e) => handleGenderClick('0', e) }
                     onMouseEnter={() => handleGenderMouseEnter('0')}>
                        Man</Link>
                </li>
                <li className='gender-item item'>
                    <Link onClick={(e) => handleGenderClick('1', e)}
                     onMouseEnter={() => handleGenderMouseEnter('1')}>
                        Woman</Link>
                </li>
            </ul>
            
        </div>
        
    );
};