import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  reducers: {
    addCart1: (state, action) => {
      const num = state.items.findIndex((el) => {
        console.log(action.payload, " action");
        return el.id === action.payload.id;
      });
      if (num === -1) {
        state.items.push(action.payload);
      } else {
        state.items[num].count += action.payload.count;
      }
    },

    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => {
        // return el.id === action.payload.id
        //deleteCart(1)
        return el.id === action.payload;
      });
      if (idx === -1) {
        alert("삭제할 장바구니 내용이 없습니다.");
      } else {
        state.items.splice(idx, 1);
      }
    },
  },
});

export const { addCart1, deleteCart } = cartSlice.actions;

export default cartSlice;
