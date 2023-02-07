import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './features/cart/modalSlice'
import cartReducer from './features/cart/cartSlice'
export const store = configureStore({

    reducer: {
        cart:cartReducer,
        modal:modalReducer


    }
})