import { Routes, Route} from "react-router-dom";
import { Home } from "./Home/Home";
import { Product } from "./Product/Product";
import { Products } from "./Products";

export function Main() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product" element={<Products/>}/>
        <Route path="/Product/:id" element={<Product/>}/>
        <Route path="/Product/Gender/:gender" element={<Products/>}/>
        <Route path="/ParentCategory/:id" element={<Products/>}/>
      </Routes>
    </div>
  );
}