import './global.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegistrationPage  from './components/pages/RegistrationPage';
import LoginPage  from './components/pages/LoginPage';
import HomePage  from './components/pages/HomePage';
import CatalogPage from "./components/pages/CatalogPage";
import ProductPage  from "./components/pages/ProductPage";


function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="User/Registration" element={<RegistrationPage/>}/>
          <Route path="User/Login" element={<LoginPage/>}/>
          <Route path="/Product" element={<CatalogPage/>}/>
          <Route path="/Product/:id" element={<ProductPage/>}/>
          <Route path="/Product/Gender/:gender" element={<CatalogPage/>}/>
          <Route path="/ParentCategory/:id" element={<CatalogPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;