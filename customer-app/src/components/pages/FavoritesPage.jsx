import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getFavorites } from "../../store/reducer";
import ProductCard from "../molecules/ProductCard";
 
export default function FavoritesPage() {
  let dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const products = useSelector((state) => state.products.productsArr);
 
  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);
 
  return (
    <div>
      {favorites.map((favorite) => {
        const matchingProducts = products.filter(
          (product) =>
            product.productVariations.some(
              (variation) => variation.id === favorite.productVariationId
            )
        );
 
        if (matchingProducts.length > 0) {
          return matchingProducts.map((product) =>
            product.productVariations.map((productVariation) => (
              <div key={productVariation.id}>
                <h3>{productVariation.Name}</h3>
                <ProductCard product={product} productVariation={productVariation} />
              </div>
            ))
          );
        } else {
          return (
            <div key={favorite.id}>
                Not found
            </div>
          );
        }
      })}
    </div>
  );
}
 