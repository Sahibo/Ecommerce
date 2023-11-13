import '../../global.css';
import './styles/molecules.css';
 
import BagIcon  from '../../icons/bag_shopping_icon.svg';
import FavIcon  from '../../icons/like_icon.svg';
import AccountIcon  from '../../icons/account_icon.svg';
 
import React from 'react';
import { ShopCard, MyAccount } from '../../store/reducer'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
 
export default function AccountNavigationHeader () {
    const navigate = useNavigate()
    let dispatch = useDispatch()
 
    const handleAccountNavigationClick = async(result, e) => {
        e.preventDefault();
        
        if (result === "Auth") {            
            navigate(`/User/${result}`)
        }
        else if (result === "Login")
        {
            navigate(`/User/${result}`)
        }
        // if (result === "Account") {
        //     //await dispatch(getOrders(result))
        //     navigate(`/User/${result}`)
        // }
        else if (result === "ShopCard") {
            //await dispatch(getItemsFromCard(result))
            navigate(`/User/${result}`)
        }
      };
 
    return (
        <div className='account-navigation-container container'>
            <ul className='buttons-list list'>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick('Auth', e)}>
                        <img src={AccountIcon} className="icon" alt="Icon"/>
                    </Link>
                </li>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick('FavItems', e)}>
                        <img src={FavIcon} className="icon" alt="Icon"/>
                    </Link>
                </li>
                <li className='account-item item'>
                    <Link onClick={(e) => handleAccountNavigationClick('ShopCard', e)}>
                        <img src={BagIcon} className="icon" alt="Icon"/>
                    </Link>
                </li>
            </ul>
        </div>
       
    );
};