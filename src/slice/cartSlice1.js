import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initState = {
  items: [], // 장바구니 아이템들을 저장하는 배열
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState, // 초기 상태 사용
  reducers: {
    // 장바구니에 아이템 추가
    addCart1: (state, action) => {
      const num = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id && el.title === action.payload.title // 상품명으로 비교
        );
      });
      if (num === -1) {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          img: action.payload.img,
          count: 1, // 기본 count는 1로 설정
        });
      } else {
        state.items[num].count += action.payload.count; // 수량 업데이트
      }
    },

    // 장바구니에서 아이템 삭제
    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id && el.title === action.payload.title // 상품명으로 비교
        );
      });
      if (idx !== -1) {
        state.items.splice(idx, 1); // 아이템 삭제
      } else {
        alert("삭제할 장바구니 내용이 없습니다.");
      }
    },

    // 장바구니 아이템 수량 업데이트
    updateCartItem: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id && el.title === action.payload.title // 상품명으로 비교
        );
      });
      if (idx !== -1) {
        state.items[idx].count = action.payload.count; // 수량 업데이트
      }
    },
  },
});

export const { addCart1, deleteCart, updateCartItem } = cartSlice.actions;
export default cartSlice;
