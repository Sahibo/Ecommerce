import '../../global.css';

import React from 'react';
import {getByGender} from '../../store/reducer'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";

export default function GendersHeader ({ handleMouseEnter }) {
    const navigate = useNavigate()
    let dispatch = useDispatch()

    const handleGenderClick = async(gender, e) => {
        e.preventDefault();
        await dispatch(getByGender(gender))
        navigate(`Product/Gender/${gender}`)
      };
  
    return (
        <div className='genders-container container'>
            <ul className='genders-list list'>
                <li className='gender-item item'>
                    <Link onClick={(e) => handleGenderClick('1', e) }
                     onMouseEnter={handleMouseEnter}>
                        Man</Link>
                </li>
                <li className='gender-item item'>
                    <Link onClick={(e) => handleGenderClick('2', e)}
                     onMouseEnter={handleMouseEnter}>
                        Woman</Link>
                </li>
            </ul>
            
        </div>
        
    );
};