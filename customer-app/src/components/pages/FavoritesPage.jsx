import { useDispatch } from "react-redux";
import "../../global.css";
import "./styles/pages.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { showFavorites } from "../../store/reducer";


export default function FavoritesPage() {
    let dispatch = useDispatch()
    const favorites = useSelector((state) => state.user.favorites);
    console.log(favorites)

    useEffect(() => {
        dispatch(showFavorites())
    }, [dispatch])

    return (
        <div>
            {favorites.map((favorite) => (
                <div key={favorite.id}>
                    <h3>{favorite.productVariationId}</h3>
                </div>
            ))}
        </div>
    );
}

