import { configureStore } from '@reduxjs/toolkit';
import  {productsSlice}  from './reducer';
import  {userSlice}  from './reducer';


let store = configureStore({
    reducer:{
        products: productsSlice.reducer,
        user: userSlice.reducer
    }
})

export default store