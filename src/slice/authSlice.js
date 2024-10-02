import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'

const initState = {
    loginUser: [],
    isLogin : false,      //로그인상태를 나타냄
    memberList:[]

}


const authSlice = createSlice({
    name:'auth',
    initialState: initState,
    reducers:{
        loginUserFn:(state,action)=>{
            const num = state.loginUser.findIndex(el=>{
                return el.userEmail === action.payload.userEmail
            })
        if(num === -1){
            state.loginUser.push(action.payload)
            state.isLogin =true
        }

        },
        logOutFn: (state,action)=>{
            state.loginUser.splice(0,1)
            state.isLogin =false

        }
    }
 


})





 

export const {loginUserFn, logOutFn} =authSlice.actions
export default authSlice