import { configureStore } from "@reduxjs/toolkit";
import cartSlice1 from "../slice/cartSlice1";

const index = configureStore({
  reducer: {
    cart: cartSlice1.reducer,
  },
});

export default index;
