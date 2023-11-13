import '../../global.css';
import './styles/pages.css';

import { Link, useNavigate } from "react-router-dom";
import Header from "../organisms/Header"
 
import { getAllProducts } from '../../store/reducer'
import { useDispatch} from "react-redux";;

export default function HomePage() {
    const navigate = useNavigate()
    let dispatch = useDispatch()
  
    const handleAllProductsClick = async (e) => {
      e.preventDefault();
      console.log("Start");
      await dispatch(getAllProducts())
      console.log("end");
      navigate(`Product`)
    };
  return (
    <div className="home-container page-container">
      <Link onClick={(e) => handleAllProductsClick(e)}>Show all</Link>
    </div>
  );
}

//<Link onClick={(e) => handleAllProductsClick(e)}>Show all</Link>