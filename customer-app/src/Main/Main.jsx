import { Routes, Route} from "react-router-dom";
import { Home } from "./Home/Home";
import { Products } from "./Products";

export function Main() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product/Gender/:gender" element={<Products/>}/>
        <Route path="/ParentCategory/:id" element={<Products/>}/>
      </Routes>
    </div>
  );
}