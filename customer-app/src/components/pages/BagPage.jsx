import { useDispatch, useSelector } from "react-redux";
import "../../global.css";
import "./styles/pages.css";
import React, { useEffect } from "react";
import { getAllItems } from "../../store/reducer";
 
 
export default function BagPage() {
    let dispatch = useDispatch()
    const items = useSelector((state) => state.bag.items);
    
 
    useEffect(() => {
        dispatch(getAllItems())
    }, [dispatch])
 
    return (
        <div>
            {items.map((item) => (
                <div key={item.productVariationId}>
                    <h1>{item.name}</h1>
                    <h3>{item.quantity}</h3>
                    <h3>{item.totalPrice}</h3>
                    <h3>{item.shoppingCartId}</h3>
                </div>
            ))}
        </div>
    );
}
 
 