import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  reducers: {
    addCart1: (state, action) => {
      const num = state.items.findIndex((el) => {
        return el.id === action.payload.id && el.title === action.payload.title;
      });
      if (num === -1) {
        state.items.push(action.payload);
      } else {
        state.items[num].count += action.payload.count;
      }
    },

    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => el.id === action.payload.id); // id만 사용하여 비교
      if (idx !== -1) {
        state.items.splice(idx, 1);
      } else {
        alert("삭제할 장바구니 내용이 없습니다.");
      }
    },

    updateCartItem: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return el.id === action.payload.id && el.title === action.payload.title;
      });
      if (idx !== -1) {
        state.items[idx].count = action.payload.count;
      }
    },
  },
});

export const { addCart1, deleteCart, updateCartItem } = cartSlice.actions;
export default cartSlice;
