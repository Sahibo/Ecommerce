import '../../global.css';
import './styles/atoms.css';
import { useSelector } from 'react-redux';

export default function CategoriesList() {
  const categories = useSelector((state) => state.parentCategories.categoriesArray);

  return (
    <div className="categories-container">
      <ul className='categories-list list'>
        {Array.isArray(categories) && categories.length > 0 ?
          (categories.map((category, index) => (
            <li className='categories-item item' key={index}>
              <a>{category.name}</a>
            </li>
          ))) : <></>}
      </ul>
    </div>
  );
};