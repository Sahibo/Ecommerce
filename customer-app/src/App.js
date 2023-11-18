import './global.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthPage  from './components/pages/AuthPage';
import HomePage  from './components/pages/HomePage';
import CatalogPage from "./components/pages/CatalogPage";
import ProductPage  from "./components/pages/ProductPage";

import Header from "./components/organisms/Header"
import Footer from "./components/organisms/Footer"



function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/User/Auth" element={<AuthPage/>}/>
          <Route path="/Product" element={<CatalogPage/>}/>
          <Route path="/Product/Gender/:gender" element={<CatalogPage/>}/>
          <Route path="/Product/Category/:id" element={<CatalogPage/>}/>
          <Route path="/ParentCategory/:id" element={<CatalogPage/>}/>

          <Route path="/Product/:productId/ProductVariation/:productVariationId" element={<ProductPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}


export default App;
