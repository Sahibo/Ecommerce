import '../../global.css';
import './styles/atoms.css';

export default function CategoriesList ({ categories }) {


    return (
      <div className="categories-container">
        <ul className='categories-list list'>
            {categories.map((category, index) => (
            <li className='categories-item item' key={index}>
                {category}
            </li>
            ))}
        </ul>
      </div>
    );
  };