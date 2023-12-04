import "./global.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage";
import HomePage from "./components/pages/HomePage";
import CatalogPage from "./components/pages/CatalogPage";
import ProductPage from "./components/pages/ProductPage";
import AccountPage from "./components/pages/AccountPage";
import BagPage from "./components/pages/BagPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import { useSelector } from "react-redux";
import ProductCard from "./components/molecules/ProductCard";

function App() {

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  // const keyToRemove = 'isAuthenticated';
  // localStorage.removeItem(keyToRemove);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {isAuthenticated ? (
            <Route path="/User/Account" element={<AccountPage />} />
          ) : (
            <Route path="/User/Account" element={<AuthPage />} />
          )}

          {!isAuthenticated ? (
            <Route path="/User/Auth" element={<AuthPage />} />
          ) : (
            <Route path="/User/Auth" element={<AccountPage />} />
          )}
          <Route path="/User/Favorites" element={<FavoritesPage />} />
          <Route path="/User/Bag" element={<BagPage />} />
          <Route path="/Product" element={<CatalogPage />} />
          <Route path="/Product/Gender/:gender" element={<CatalogPage />} />
          <Route path="/Product/Category/:id" element={<CatalogPage />} />
          <Route path="/ParentCategory/:id" element={<CatalogPage />} />

          <Route
            path="/Product/:productId/ProductVariation/:productVariationId"
            element={<ProductPage />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
