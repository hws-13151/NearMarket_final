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
        return (
          el.id === action.payload.id && // 상품 id로 비교
          el.category === action.payload.category // 카테고리로 구별
        );
      });
      if (num === -1) {
        state.items.push(action.payload); // 새 아이템 추가
      } else {
        state.items[num].count += action.payload.count; // 기존 아이템이면 수량 업데이트
      }
    },

    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id && // 상품 id로 비교
          el.category === action.payload.category // 카테고리로 구별
        );
      });
      if (idx !== -1) {
        state.items.splice(idx, 1); // 해당 아이템 삭제
      } else {
        alert("삭제할 장바구니 내용이 없습니다.");
      }
    },

    deleteCartAll: (state) => {
      state.items = [];
    },

    updateCartItem: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id && // 상품 id로 비교
          el.category === action.payload.category // 카테고리로 구별
        );
      });
      if (idx !== -1) {
        state.items[idx].count = action.payload.count; // 수량 업데이트
      }
    },
  },
});

export const { addCart1, deleteCart, deleteCartAll, updateCartItem } =
  cartSlice.actions;
export default cartSlice;
