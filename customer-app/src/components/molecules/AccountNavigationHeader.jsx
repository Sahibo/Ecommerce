import '../../global.css';
import './styles/molecules.css';
 
import BagIcon from '../../icons/bag_shopping_icon.svg';
import FavIcon from '../../icons/like_icon.svg';
import AccountIcon from '../../icons/account_icon.svg';
 
import React, { useEffect } from 'react';
import { ShopCard, MyAccount } from '../../store/reducer'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
 
export default function AccountNavigationHeader() {
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("AccountNavigationHeader")
    console.log(isAuthenticated)
 
 
    const handleAccountNavigationClick = async (result, e) => {
        e.preventDefault();
       
        console.log("handleAccountNavigationClick")
        console.log(isAuthenticated)
        navigate(`/User/${result}`)
    };
 
    return (
        <div className='account-navigation-container container'>
            <ul className='buttons-list list'>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick(isAuthenticated ? 'Account' : 'Auth', e)}>
                        <img src={AccountIcon} className="icon" alt="Icon" />
                    </Link>
                </li>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick('Favorites', e)}>
                        <img src={FavIcon} className="icon" alt="Icon" />
                    </Link>
                </li>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick('Bag', e)}>
                        <img src={BagIcon} className="icon" alt="Icon" />
                    </Link>
                </li>
            </ul>
        </div>
 
    );
};