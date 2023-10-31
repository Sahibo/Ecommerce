import { Routes, Route, Link } from "react-router-dom";
import { Products } from './Products';

export function Home() {
  return (
    <div className="main-container">
      {/* Use Link directly without enclosing anchor tag */}
      <Link to='/products' className="nav-list-item">
        <span>Products</span>
      </Link>
    </div>
  );
}