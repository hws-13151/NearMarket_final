import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  reducers: {
    // 장바구니에 아이템 추가
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

    // 장바구니에서 아이템 삭제
    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return el.id === action.payload;
      });
      if (idx === -1) {
        alert("삭제할 장바구니 내용이 없습니다.");
      } else {
        state.items.splice(idx, 1);
      }
    },

    // 장바구니 아이템 수량 업데이트
    updateCartItem: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find((el) => el.id === id);
      if (item) {
        item.count = count; // 새로운 수량으로 업데이트
      }
    },
  },
});

export const { addCart1, deleteCart, updateCartItem } = cartSlice.actions;

export default cartSlice;
