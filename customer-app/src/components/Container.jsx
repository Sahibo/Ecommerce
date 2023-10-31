import { Routes, Route} from "react-router-dom";
import { Home } from "./Home";
import { Products } from "./Products";

export function Container() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}