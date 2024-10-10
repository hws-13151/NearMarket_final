import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const viewcountSlice = createSlice({
    name: "viewcount",
    initialState: {
        viewcountInformation: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateViewCountInServer.fulfilled, (state, action) => {
            const { productId, newViewCount } = action.payload;

            // viewcountInformation 객체가 존재하지 않을 경우 빈 객체로 설정
            if (!state.viewcountInformation) {
                state.viewcountInformation = {};
            }

            // viewcountInformation에 productId로 조회수 설정
            state.viewcountInformation[productId] = newViewCount;
        });
    },
});

export default viewcountSlice

export const updateViewCountInServer = createAsyncThunk(
    "viewcount/updateViewCountInServer",
    async (productId, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3001/vegetableItems/${productId}`);
            const currentViewCount = response.data.viewcount || 0;


            await axios.patch(`http://localhost:3001/vegetableItems/${productId}`, {
                viewcount: currentViewCount + 1,
            });

            // 업데이트된 조회수 리턴
            return { productId, newViewCount: currentViewCount + 1 };
        } catch (error) {
            alert(error)
        }
    }
);