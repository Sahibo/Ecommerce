import '../../global.css';
import './styles/atoms.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByCategoryId } from '../../store/reducer';
import { Link, useNavigate } from 'react-router-dom';

 
export default function CategoriesList() {
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const categories = useSelector((state) => state.parentCategories.categoriesArray);
 
 
  const handleCategoryClick = async(id, e) =>
  {
    e.preventDefault();
    dispatch(getProductsByCategoryId(id));
    navigate(`Product/Category/${id}`)

  }
 
  return (
    <div className="categories-container">
      <ul className='categories-list list'>
        {Array.isArray(categories) && categories.length > 0 ?
          (categories.map((category, index) => (
            <li className='categories-item item' key={index}>
              <a onClick={(e) => handleCategoryClick(category.id, e)}>{category.name}</a>
            </li>
          ))) : <></>}
      </ul>
    </div>
  );
};