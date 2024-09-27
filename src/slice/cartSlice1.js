import { createSlice } from "@reduxjs/toolkit";

const initState = {
  items: [],
};

const cartSlice1 = createSlice({
  name: "snacks", //cartSlice1
  initialState: initState,
  reducers: {
    addCart1: (state, action) => {
      state.items[action.payload.id] = action.payload; // 상품 데이터를 상태에 저장
    },
  },
});

export const { addCart1 } = cartSlice1.actions;

export default cartSlice1;

// const num = state.items.findIndex((el) => {
//   console.log(action.payload, "action");
//   return el.id === action.payload.id;
// });

// if (num === -1) {
//   state.items.push(action.payload);
// } else {
//   state.items[num].count += action.payload.count;
// }

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // 비동기로 특정 ID에 맞는 상품 데이터 가져오기

// export const fetchSnackById = createAsyncThunk(
//   "snacks/fetchSnackById",
//   async (id) => {
//     const response = await axios.get(
//       `http://localhost:3001/snackItems?id=${id}`
//     );
//     return response.data[0]; // 첫 번째 데이터 반환
//   }
// );

// const snackSlice = createSlice({
//   name: "snacks",
//   initialState: {
//     items: {},
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSnackById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSnackById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items[action.payload.id] = action.payload; // id를 키로 해서 상품 저장
//       })
//       .addCase(fetchSnackById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default snackSlice.reducer;
