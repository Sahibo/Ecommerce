import "../../global.css";
import "./styles/molecules.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToFavorites, deleteFromFavorites, setFavProducts , getProductById} from '../../store/reducer';
 
export default function ProductCard({ product, productVariation }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const favoriteProducts = useSelector((state) => state.products.favoritesProductsArr) || [];
  let selectedProduct = useSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    dispatch(setFavProducts());
  }, [dispatch, ]);
 

  const [isFavorite, setIsFavorite] = useState(false);
 
  useEffect(() => {
    const checkIsFavorite = () => {
      const isFav = favoriteProducts.some(favProduct =>
        favProduct.productVariations.some(mapProductVariation =>
          mapProductVariation.id === productVariation.id && mapProductVariation.isFavorite
        )
      );
      setIsFavorite(isFav);
    };
 
    checkIsFavorite();
  }, [favoriteProducts, productVariation]);
 
  // const isFavorite = favoriteProducts.some(favProduct =>
  //   favProduct.productVariations.some(mapProductVariation =>
  //     mapProductVariation.id === productVariation.id && mapProductVariation.isFavorite
  //   )
  // );
 
 
  const handleProductClick = async (productId, productVariationId, e) => {
    e.preventDefault();
    await dispatch(getProductById(productId));

    navigate(`/Product/${productId}/ProductVariation/${productVariationId}`);
  };
 
  const handleAddToFavClick = (e, id) => {
    e.preventDefault();
 
    if (!isFavorite) {
      dispatch(addToFavorites(id))
    } else {
      dispatch(deleteFromFavorites(id))
    }
    setIsFavorite(!isFavorite);
  };
 
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
          <p>$ {productVariation.subProductVariations[0].price}</p>
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
 