import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import cartReducer from "./slices/cartSlice.js";
import ordersReducer from "./slices/orderSlice.js";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,

    auth: authReducer,
  },
});

export default store;
