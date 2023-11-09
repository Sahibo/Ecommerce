import '../../global.css';
import './styles/molecules.css';

import ParentCategoriesList from "../atoms/ParentCategoriesList"
import CategoriesList from "../atoms/CategoriesList"

export default function CollapsibleHeader () {
    const parentCategories = ['parentCategory 1', 'parentCategory 2', 'parentCategory 3'];
    const categories = ['Category 1', 'Category 2', 'Category 3'];
  
    return (
      <div className="collapsible-container container">
        <ParentCategoriesList parentCategories={parentCategories} />
        <CategoriesList categories={categories} />
      </div>
    );
  };