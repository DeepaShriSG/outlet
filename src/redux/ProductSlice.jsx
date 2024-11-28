import { createSlice, createAsyncThunk , createSelector  } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://ecombe-gz7j.onrender.com/products/allproducts");
  return response.data.items;
});

// Product slice
export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // List of all products
    cart: JSON.parse(sessionStorage.getItem("cart")) || [], // Items in the cart
    status: "idle", // Status for async actions
    error: null, // Error state
  },
  reducers: {
    // Add to cart reducer
    addtoCart: (state, action) => {
      const payload = action.payload;
      console.log(payload)
      const existingProductIndex = state.cart.findIndex(
        (item) => item.product._id === payload.product._id
      );
      
      if (existingProductIndex !== -1) {
        state.cart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + (payload.quantity || 1) }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...payload, quantity: payload.quantity || 1 }];
      }

      // Update session storage
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Update quantity in cart
    updateCart: (state, action) => {
      const { productId, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );

      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Remove product from cart
    removeCart: (state, action) => {
      const productId = action.payload;
  
      state.cart = state.cart.filter((item) => item.product._id !== productId);
      console.log(state.cart)
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Clear the cart
    clearCart: (state) => {
      sessionStorage.removeItem("cart");
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


// Exporting actions
export const { addtoCart, updateCart, removeCart, clearCart } = ProductSlice.actions;

// Exporting reducer
export default ProductSlice.reducer;

export const selectBagMRP = (state) =>
  state.products.cart.reduce((total, item) => {
    const price = Number(item.product.price);
    const quantity = Number(item.quantity);
    return total + price * quantity;
  }, 0);


// Fixed Shipping Fee
export const shipping = (state) => 70;

// Total: Bag-MRP - Discount + Shipping
export const selectTotal = (state) => {
  const bagMRP = selectBagMRP(state);
  const shippingFee = shipping(state);
  return bagMRP  + shippingFee;
}