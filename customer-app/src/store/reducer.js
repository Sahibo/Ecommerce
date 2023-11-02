import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAll = createAsyncThunk(
    'Product',
    async (_,{ getState }) => {
      const state = getState();
      const url = `${state.products.base}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products by gender');
      }
      const data = await response.json();
      return data;
    }
  );

export const getByGender = createAsyncThunk(
    'Product/Gender/:gender',
    async (gender, { getState }) => {
      const state = getState();
      const url = `${state.products.base}/Gender/${gender}`;
            console.log(url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products by gender');
      }
      const data = await response.json();
      return data;
    }
  );


const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsArr: [],
    isLoading: false,
    error: null,
    base: 'https://localhost:44313/Product'
  },

  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getByGender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getByGender.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getByGender.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const { getByGender } = productsSlice.actions;
export default productsSlice.reducer;