import '../../global.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../organisms/Header"

import {getAll} from '../../store/reducer'
import { useDispatch} from "react-redux";;

export default function HomePage() {
    const navigate = useNavigate()
    let dispatch = useDispatch()
  
    const handleAllProductsClick = async (e) => {
      e.preventDefault();
      console.log("Start");
      await dispatch(getAll())
      console.log("end");
      navigate(`Product`)
    };
  return (
    <div className="home-container">
      <Header/>
      <Link onClick={(e) => handleAllProductsClick(e)}>Show all</Link>
    </div>
  );
}

//<Link onClick={(e) => handleAllProductsClick(e)}>Show all</Link>