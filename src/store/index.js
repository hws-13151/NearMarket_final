import { configureStore } from "@reduxjs/toolkit";
import cartSlice1 from "../slice/cartSlice1";
import authSlice from "../slice/authSlice";
import adminSlice from "../slice/adminSlice";
import paymentSlice from "../slice/paymentSlice";

const index = configureStore({
  reducer: {
    cart: cartSlice1.reducer,
    auth: authSlice.reducer,
    admin: adminSlice.reducer,
    payment: paymentSlice.reducer
  },
});

export default index;
