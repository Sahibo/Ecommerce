import { configureStore } from '@reduxjs/toolkit';
import { bagSlice, parentCategoriesSlice, productsSlice } from './reducer';
import { userSlice } from './reducer';
 
 
let store = configureStore({
    reducer:{
        products: productsSlice.reducer,
        bag: bagSlice.reducer,
        user: userSlice.reducer,
        parentCategories: parentCategoriesSlice.reducer
    }
})
 
export default store