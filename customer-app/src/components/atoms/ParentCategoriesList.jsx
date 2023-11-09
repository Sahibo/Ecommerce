import '../../global.css';
import './styles/atoms.css';

export default function ParentCategoriesList ({ parentCategories }) {
   
    return (
      <div className="parentCategories-container">
        <ul className='parentCategories-list list'>
            {parentCategories.map((category, index) => (
            <li className='parentCategories-item item' key={index}>
                {category}
            </li>
            ))}
        </ul>
      </div>
    );
  };