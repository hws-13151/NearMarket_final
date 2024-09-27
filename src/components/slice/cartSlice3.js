import { createSlice } from '@reduxjs/toolkit';

const cartSlice3 = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, count, isPremium, isOrganic } = action.payload;
      const item = {
        id,
        title,
        price,
        count,
        isPremium,
        isOrganic,
      };
      state.items.push(item); // 장바구니에 아이템 추가
    },
    clearCart: (state) => {
      state.items = []; // 장바구니 초기화
    },
  },
});

export const { addToCart, clearCart } = cartSlice3.actions;
export default cartSlice3.reducer;
