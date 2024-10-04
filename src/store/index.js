import { configureStore } from "@reduxjs/toolkit";
import cartSlice1 from "../slice/cartSlice1";
import authSlice from "../slice/authSlice";
import adminSlice from "../slice/adminSlice";

const index = configureStore({
  reducer: {
    cart: cartSlice1.reducer,
    auth: authSlice.reducer,
    admin: adminSlice.reducer
  },
});

export default index;
