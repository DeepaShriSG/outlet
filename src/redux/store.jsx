import { configureStore } from '@reduxjs/toolkit'
import MenuReducer from "./MenuSlice"
import ProductReducer from "./ProductSlice"

export default configureStore({
  reducer: {
    show:MenuReducer,
    products: ProductReducer,
  },
})