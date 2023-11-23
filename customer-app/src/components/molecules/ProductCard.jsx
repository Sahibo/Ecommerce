import "../../global.css";
import "./styles/molecules.css";
import FavIcon from "../../icons/like_icon.svg";
 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToFavorites, deleteFromFavorites }  from '../../store/reducer';
export default function ProductCard({ product, productVariation }) {
  let products = useSelector((state) => state.products.productsArr);
  console.log(products);
  let dispatch = useDispatch()
  let navigate = useNavigate();
 
  const handleProductClick = async (productId, productVariationId, e) => {
    e.preventDefault();
 
    navigate(`/Product/${productId}/ProductVariation/${productVariationId}`);
  };
 
  const handleAddToFavClick = (e, id) =>
  {
    console.log(id)
    e.preventDefault()
    dispatch(addToFavorites(id))
    // dispatch(deleteFromFavorites(id))
  }
 
 
  return (
    <div className="productCard-container">
      <div className="card-image-container">
        <Link onClick={(e) => handleProductClick(product.id, productVariation.id, e)}>
 
          <img src={`data:image/jpeg;base64,${productVariation.productImages[0].imageData}`}
            alt={`Product Img`}
            className="card-image" />
        </Link>
      </div>
 
      <div className="card-bottom-container">
        <div className="card-info-container">
          <h5>{product.name}</h5>
          <p>$ {productVariation.price}</p>
        </div>
 
        <div className="card-favIcon-container" onClick={(e) => handleAddToFavClick(e, productVariation.id)}>
          <div className="favIcon" alt="Icon"/>
        </div>
      </div>
    </div >
  );
}