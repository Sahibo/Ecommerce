import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAll = createAsyncThunk(
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

export const registerUser = createAsyncThunk(
  'User/Registration',
  async ({ email, password }, { getState }) => {
    let state = getState();
    const url = `${state.user.base}/Registration`;

    console.log(url)
    const requestBody = {
      email,
      password,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response)


    if (response.ok) {
      const data = await response.json();
      console.error("Registration success");
    } else {
      console.error("Registration error");
    }
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
      if (response.status === 404) {
        return null;
      } else {
        throw new Error('Failed to fetch products by gender');
      }
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const getById = createAsyncThunk(
  'Product/:id',
  async (id, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/${id}`;
    console.log(url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch product by id');
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





const userSlice = createSlice({
  name: 'user',
  initialState: {
    base: 'https://localhost:44313/User'
  },
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export { productsSlice, userSlice };