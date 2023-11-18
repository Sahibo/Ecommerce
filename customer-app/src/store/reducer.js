import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  'Product',
  async (_, { getState }) => {
    const state = getState();
    const url = `${state.products.base}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products by gender');
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const getParentCategoriesByGender = createAsyncThunk(
  'ParentCategory/Gender/:gender',
  async (gender, { getState }) => {
    const state = getState()
    const url = `${state.parentCategories.base}/Gender/${gender}`;
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch parent categories');
    }
    const data = await response.json();
    return data;
  }
);

export const getCategoriesByParentId = createAsyncThunk(
  'Categories',
  async (parentCategoryId, { getState }) => {
    const state = getState();
    const parentCategoriesArray = state.parentCategories.parentCategoriesArray;


    const allCategories = parentCategoriesArray.flatMap(
      parentCategory => parentCategory.categories
    );

    const matchingCategories = allCategories.filter(
      category => category.parentCategoryId === parentCategoryId
    );


    if (matchingCategories.length === 0) {
      throw new Error('Categories not found');
    }

    return matchingCategories;
  }
);

export const getProductsByCategoryId = createAsyncThunk(
  'Product/Category/:id',
  async (id, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/Category/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error('Failed to fetch products by gender');
      }
    }

    console.log(response)
    const data = await response.json();
    console.log(data)
    return data;
  }
);
 

export const getProductByGender = createAsyncThunk(
  'Product/Gender/:gender',
  async (gender, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/Gender/${gender}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error('Failed to fetch products by gender');
      }
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
);

export const getProductById = createAsyncThunk(
  'Product/:productId/ProductVariation/:productVariationId',
  async (id, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/${id}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch product by id');
    }

    const data = await response.json();
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'User/Registration',
  async ({ email, password }, { getState }) => {
    try {
      let state = getState();
      const url = `${state.user.base}/Registration`;

      const requestBody = {
        email,
        password,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const token = await response.text();

      localStorage.setItem('accessToken', token);

      return token;
    } 
    
    catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'User/Login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      let state = getState();
      const url = `${state.user.base}/Login`;

      const requestBody = {
        email,
        password,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });


      const token = await response.text();

      localStorage.setItem('accessToken', token);

      return token;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message); // Reject the promise with the error message
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsArr: [],
    selectedProductsArr: [],
    isLoading: false,
    error: null,
    base: 'https://localhost:44313/Product'
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductByGender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByGender.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProductByGender.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProductsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    base: 'https://localhost:44313/User',
    message: '',
    isAuthenticated: false, 
    accessToken: null,     
    error: '' 
  },
  reducers: {
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload;
        console.log('fulfii')
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.error = action.payload;
        console.log(state.error)
      })
      .addCase(registerUser.pending, (state) => {
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload;
        console.log(state.accessToken)
        state.message = 'Registration successful';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.message = action.payload;
      })
  },
});

const parentCategoriesSlice = createSlice({
  name: 'parentCategories',
  initialState: {
    base: 'https://localhost:44313/ParentCategory',
    message: '',
    parentCategoriesArray: [],
    categoriesArray: []
  },
  reducers: {
    clearCategories: (state, action) => {
      return { ...state, categoriesArray: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParentCategoriesByGender.pending, (state, action) => {

      })
      .addCase(getParentCategoriesByGender.fulfilled, (state, action) => {
        const data = action.payload;


        state.parentCategoriesArray = data;
      })
      .addCase(getParentCategoriesByGender.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getCategoriesByParentId.pending, (state, action) => {

      })
      .addCase(getCategoriesByParentId.fulfilled, (state, action) => {
        state.categoriesArray = action.payload;
        console.log(state.categoriesArray)
      })
      .addCase(getCategoriesByParentId.rejected, (state, action) => {
        state.message = action.payload;
      })
  },
})

export { productsSlice, userSlice, parentCategoriesSlice };

export const { clearCategories } = parentCategoriesSlice.actions;
export const { clearAuthState } = userSlice.actions;

export default parentCategoriesSlice.reducer;