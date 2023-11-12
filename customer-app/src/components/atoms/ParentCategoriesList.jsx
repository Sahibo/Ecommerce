import '../../global.css';
import { getCategories } from '../../store/reducer';
import './styles/atoms.css';
import { useDispatch, useSelector } from 'react-redux';

export default function ParentCategoriesList() {
  const parentCategories = useSelector((state) => state.parentCategories.parentCategoriesArray);
  const dispatch = useDispatch();

  const getCategoriesByParentId = (id) => {
    dispatch(getCategories(id));
    
  };

  return (
    <div className="parentCategories-container">
      <ul className='parentCategories-list list'>
        {Array.isArray(parentCategories) && parentCategories.length > 0 ?
          (parentCategories.map((parentCategory, index) => (
            <li className='parentCategories-item item' key={index}>
              <a onClick={() => getCategoriesByParentId(parentCategory.id)}>{parentCategory.name}</a>
            </li>
          ))) : <>Empty</>}
      </ul>
    </div>
  );
};
