import '../../global.css';
import './styles/molecules.css';

import ParentCategoriesList from "../atoms/ParentCategoriesList"
import CategoriesList from "../atoms/CategoriesList"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getParentCategoriesByGender } from '../../store/reducer';

export default function CollapsibleHeader () {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.gender);

  useEffect(() => {
    dispatch(getParentCategoriesByGender(gender));
  }, [dispatch, gender]);

    return (
      <div className="collapsible-container container">
        <ParentCategoriesList/>
        <CategoriesList/>
      </div>
    );
  };