import "../../global.css";
import "./styles/molecules.css";
import FavIcon from "../../icons/like_icon.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showFavorites, addToFavorites, deleteFromFavorites } from '../../store/reducer';
 
export default function ProductCard({ product, productVariation }) {
  let favorites = useSelector((state) => state.user.favorites);
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
 
  const [isFavorite, setIsFavorite] = useState(
    favorites.find((fav) => fav.productVariationId === productVariation.id) !== undefined
  );
 
  const handleProductClick = async (productId, productVariationId, e) => {
    e.preventDefault();
    navigate(`/Product/${productId}/ProductVariation/${productVariationId}`);
  };
 
  const handleAddToFavClick = (e, id) => {
    e.preventDefault();
 
    if (!isFavorite) {
      dispatch(addToFavorites(id));
    } else {
      dispatch(deleteFromFavorites(id));
    }
 
    // Обновляем локальное состояние немедленно
    setIsFavorite(!isFavorite);
  };
 
  useEffect(() => {
    if (!isFavorite) {
      dispatch(showFavorites());
    }
  }, [dispatch, isFavorite]);
 
  return (
    <div className="productCard-container">
      <div className="card-image-container">
        <Link onClick={(e) => handleProductClick(product.id, productVariation.id, e)}>
          <img
            src={`data:image/jpeg;base64,${productVariation.productImages[0].imageData}`}
            alt={`Product Img`}
            className="card-image"
          />
        </Link>
      </div>
 
      <div className="card-bottom-container">
        <div className="card-info-container">
          <h5>{product.name}</h5>
          <p>$ {productVariation.price}</p>
        </div>
 
        <div className="card-favIcon-container">
          <div
            className={`favIcon ${isFavorite ? "filled" : ""}`}
            alt="Icon"
            onClick={(e) => handleAddToFavClick(e, productVariation.id)}
          />
        </div>
      </div>
    </div>
  );
}
 