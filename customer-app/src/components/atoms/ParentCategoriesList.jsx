import '../../global.css';
import './styles/atoms.css';

import { getCategoriesByParentId } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function ParentCategoriesList() {
  const parentCategories = useSelector((state) => state.parentCategories.parentCategoriesArray);
  const dispatch = useDispatch();

  const getCategories = (id) => {
    dispatch(getCategoriesByParentId(id));
    
  };

  return (
    <div className="parentCategories-container">
      <ul className='parentCategories-list list'>
        {Array.isArray(parentCategories) && parentCategories.length > 0 ?
          (parentCategories.map((parentCategory, index) => (
            <li className='parentCategories-item item' key={index}>
              <a onClick={() => getCategories(parentCategory.id)}>{parentCategory.name}</a>
            </li>
          ))) : <>Empty</>}
      </ul>
    </div>
  );
};
