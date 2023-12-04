import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getParentCategoriesByGender = createAsyncThunk(
  "ParentCategory/Gender/:gender",
  async (gender, { getState }) => {
    const state = getState();
    const url = `${state.parentCategories.base}/Gender/${gender}`;
    const response = await fetch(url);
    console.log(url);

    if (!response.ok) {
      throw new Error("Failed to fetch parent categories");
    }
    const data = await response.json();
    return data;
  }
);

export const getCategoriesByParentId = createAsyncThunk(
  "Categories",
  async (parentCategoryId, { getState }) => {
    const state = getState();
    const parentCategoriesArray = state.parentCategories.parentCategoriesArray;

    const allCategories = parentCategoriesArray.flatMap(
      (parentCategory) => parentCategory.categories
    );

    const matchingCategories = allCategories.filter(
      (category) => category.parentCategoryId === parentCategoryId
    );

    if (matchingCategories.length === 0) {
      throw new Error("Categories not found");
    }

    return matchingCategories;
  }
);

export const getProductsByCategoryId = createAsyncThunk(
  "Product/Category/:id",
  async (id, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/Category/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error("Failed to fetch products by gender");
      }
    }

    const data = await response.json();
    return data;
  }
);

// Products //

export const getAllProducts = createAsyncThunk(
  "Product",
  async (_, { getState }) => {
    const state = getState();
    const url = `${state.products.base}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products by gender");
    }
    const data = await response.json();
    return data;
  }
);

export const getProductByGender = createAsyncThunk(
  "Product/Gender/:gender",
  async (gender, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/Gender/${gender}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error("Failed to fetch products by gender");
      }
    }
    const data = await response.json();
    return data;
  }
);

export const getProductById = createAsyncThunk(
  "Product/:productId/ProductVariation/:productVariationId",
  async (id, { getState }) => {
    const state = getState();
    const url = `${state.products.base}/${id}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch product by id");
    }

    const data = await response.json();
    return data;
  }
);

export const setFavProducts = createAsyncThunk(
  "Favorites/Set",
  async (_, { getState }) => {
    const state = getState();
    let tempProducts = state.products.productsArr;
    let favorites = state.products.favorites;

    const updatedVariationsArray = tempProducts.flatMap((product) => {
      const updatedVariations = product.productVariations.map(
        (productVariation) => {
          const isFavorite = favorites.some(
            (fav) => fav.productVariationId === productVariation.id
          );
          return { ...productVariation, isFavorite };
        }
      );
      return updatedVariations;
    });

    const updatedProducts = tempProducts.map((product) => {
      const updatedVariationsForProduct = updatedVariationsArray.filter(
        (productVariation) => product.id === productVariation.productId
      );
      return { ...product, productVariations: updatedVariationsForProduct };
    });

    return updatedProducts;
  }
); // not done

export const filterByAsc = createAsyncThunk(
  "Products/FilterByAsc",
  async (_, { getState }) => {
    const state = getState();
    let products = state.products.productsArr;
    const temp = products.flatMap((product) => {
      let updatedVariations = product.productVariations.map(
        (productVariation) => {
          let subProductVariations = productVariation.subProductVariations;

          let filteredSubVariations = [...subProductVariations].sort(
            (a, b) => a.totalPrice - b.totalPrice
          );

          return {
            ...productVariation,
            subProductVariations: filteredSubVariations,
          };
        }
      );
      return updatedVariations;
    });

    const updatedProducts = products.map((product) => {
      const updatedVariationsForProduct = temp.filter(
        (productVariation) => product.id === productVariation.productId
      );
      return { ...product, productVariations: updatedVariationsForProduct };
    });

    return updatedProducts;
  }
);

export const filterByDesc = createAsyncThunk(
  "Products/FilterByDesc",
  async (_, { getState }) => {
    const state = getState();
    let products = state.products.productsArr;
    const temp = products.flatMap((product) => {
      let updatedVariations = product.productVariations.map(
        (productVariation) => {
          let subProductVariations = productVariation.subProductVariations;

          let filteredSubVariations = [...subProductVariations].sort(
            (a, b) => b.totalPrice - a.totalPrice
          );

          return {
            ...productVariation,
            subProductVariations: filteredSubVariations,
          };
        }
      );
      return updatedVariations;
    });

    const updatedProducts = products.map((product) => {
      const updatedVariationsForProduct = temp.filter(
        (productVariation) => product.id === productVariation.productId
      );
      return { ...product, productVariations: updatedVariationsForProduct };
    });

    return updatedProducts;
  }
);
///  USER  ///

export const setProductsArr = createAsyncThunk(
  "Products/SetProductsArr",
  async (_, { getState }) => {
    let state = getState();
    let rawProductsArr = state.products.rawProductsArr;
    console.log(rawProductsArr)
    let flattenedProducts = rawProductsArr.flatMap((productGroup) =>
      Object.values(productGroup).flatMap((variations) =>
        variations.map((variation) => ({ [variations[0].name]: variation }))
      )
    );
    console.log(flattenedProducts)
    return flattenedProducts;
  }
);

export const registerUser = createAsyncThunk(
  "User/Registration",
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      let state = getState();
      const url = `${state.user.base}/Registration`;

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

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "User/Login",
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      let state = getState();
      let url = `${state.user.base}/Login`;

      let requestBody = {
        email,
        password,
      };

      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      let data = await response.json();

      return data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "User/AddFavorites",
  async (id, { getState }) => {
    let state = getState();
    let userId = localStorage.getItem("userId");

    let url = `${state.user.base}/AddFavorite/${userId}/${id}`;
    let response = await fetch(url, { method: "POST" });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    let data = await response.json();
    return data;
  }
); // not done

export const deleteFromFavorites = createAsyncThunk(
  "User/DeleteFavorites",
  async (id, { getState }) => {
    let state = getState();
    let userId = localStorage.getItem("userId");

    let url = `${state.user.base}/DeleteFavorite/${userId}/${id}`;
    let response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to delete favorite");
    }
    let data = await response.json();

    return data;
  }
); // not done

export const getFavorites = createAsyncThunk(
  "User/GetFavorites",
  async (_, { getState }) => {
    const state = getState();
    let userId = localStorage.getItem("userId");

    const url = `${state.user.base}/ShowFavorites/${userId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }
    const data = await response.json();
    //console.log(data);
    return data;
  }
); // not done

///  Bag  ///
export const addToBag = createAsyncThunk(
  "User/AddFavorites",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      let userId = localStorage.getItem("userId");
      const url = `${state.bag.shoppingCartItemUrl}/AddToCart/${userId}/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Failed to add shopping cart item. Status: ${response.status}. Message: ${errorMessage}`
        );
      }

      const data = await response.text();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.message,
        status: error.status,
      });
    }
  }
); // not done

export const getAllItems = createAsyncThunk(
  "ShoppingCart/GetAllItems",
  async (_, { getState }) => {
    const state = getState();
    let userId = localStorage.getItem("userId");

    const url = `${state.bag.shoppingCartUrl}/GetAllItems/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get all shopping cart items");
    }
    const data = await response.json();

    console.log(data);
    return data;
  }
); // not done

const productsSlice = createSlice({
  name: "products",
  initialState: {
    rawProductsArr: [],
    productsArr: [],
    selectedProduct: {},
    selectedSubVariation: {},
    selectedVariation: {},
    favorites: [],
    favoritesProductsArr: [],
    isLoading: false,
    error: null,
    base: "https://localhost:44313/Product",
  },
  reducers: {
    setSelectedSubVariation: (state, action) => {
      let subVariation = action.payload;
      return { ...state, selectedSubVariation: subVariation };
    },
    newSetSelectedVariation: (state, action) => {
      let variation = action.payload;
      console.log("newSetSelectedVariation");
      return { ...state, selectedVariation: variation };
    },
    resetFilter: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.rawProductsArr = action.payload;
        state.isLoading = false;
        state.productsArr = state.rawProductsArr;
        
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
        state.rawProductsArr = action.payload;
        
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
        state.selectedProduct = action.payload;
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
        state.rawProductsArr = action.payload;
        setProductsArr();

        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(setFavProducts.fulfilled, (state, action) => {
        state.favoritesProductsArr = action.payload;
      })
      .addCase(filterByAsc.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        console.log(state.productsArr);
      })
      .addCase(filterByDesc.fulfilled, (state, action) => {
        state.productsArr = action.payload;
        console.log(state.productsArr);
      });
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    base: "https://localhost:44313/User",
    message: "",
    accessToken: null,
    error: "",
    userId: "",
    isAuthenticated: false,
  },
  reducers: {
    logoutUser: (state) => {
      console.log(localStorage.getItem("accessToken"));
      localStorage.removeItem("accessToken");
      console.log(localStorage.getItem("accessToken"));

      console.log(localStorage.getItem("isAuthenticated"));
      localStorage.removeItem("isAuthenticated");
      console.log(localStorage.getItem("isAuthenticated"));

      state.isAuthenticated = false;
      state.accessToken = null;
      state.message = "";
      state.error = "";
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = "Login successful";
        const { userId, token } = action.payload;
        state.accessToken = token;
        state.userId = userId;
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        localStorage.setItem("isAuthenticated", false);
        state.accessToken = null;
        state.error = action.payload.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.message = "Registration successful";
        const { userId, token } = action.payload;
        state.accessToken = token;
        state.userId = userId;
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
      })
      .addCase(registerUser.rejected, (state, action) => {
        localStorage.setItem("isAuthenticated", false);
        state.accessToken = null;
        state.error = action.payload;
      });
  },
});

const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    message: "",
    shoppingCartUrl: "https://localhost:44313/ShoppingCart",
    shoppingCartItemUrl: "https://localhost:44313/ShoppingCartItem",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.items = action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        console.log("rejected");
      })
      .addCase(addToBag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToBag.fulfilled, (state, action) => {
        console.log("fulfilled");
      })
      .addCase(addToBag.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

const parentCategoriesSlice = createSlice({
  name: "parentCategories",
  initialState: {
    base: "https://localhost:44313/ParentCategory",
    message: "",
    parentCategoriesArray: [],
    categoriesArray: [],
  },
  reducers: {
    clearCategories: (state, action) => {
      return { ...state, categoriesArray: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParentCategoriesByGender.pending, (state, action) => {})
      .addCase(getParentCategoriesByGender.fulfilled, (state, action) => {
        const data = action.payload;

        state.parentCategoriesArray = data;
      })
      .addCase(getParentCategoriesByGender.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getCategoriesByParentId.pending, (state, action) => {})
      .addCase(getCategoriesByParentId.fulfilled, (state, action) => {
        state.categoriesArray = action.payload;
        console.log(state.categoriesArray);
      })
      .addCase(getCategoriesByParentId.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export { productsSlice, userSlice, parentCategoriesSlice, bagSlice };

export const { clearCategories } = parentCategoriesSlice.actions;
export const { logoutUser } = userSlice.actions;
export const { setSelectedSubVariation, newSetSelectedVariation, resetFilter } =
  productsSlice.actions;
