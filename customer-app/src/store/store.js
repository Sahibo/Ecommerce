import { configureStore } from '@reduxjs/toolkit';
import { parentCategoriesSlice, productsSlice } from './reducer';
import { userSlice } from './reducer';


let store = configureStore({
    reducer:{
        products: productsSlice.reducer,
        user: userSlice.reducer,
        parentCategories: parentCategoriesSlice.reducer
    }
})

export default store