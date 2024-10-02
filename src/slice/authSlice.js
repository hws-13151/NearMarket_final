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
    },
    extraReducers:(builder)=>{
        builder.addCase(asyncAuthMemberFn.pending,(state,action)=>{
            state.status='Pending'
        })
        builder.addCase(asyncAuthMemberFn.fulfilled,(state,action)=>{
            state.memberList=action.payload
            state.status='Complete'
        })
        builder.addCase(asyncAuthMemberFn.rejected,(state,action)=>{
            state.status= 'Fail'
        })
    }

})




export const asyncAuthMemberFn = createAsyncThunk(`auth/asyncAuthMemberFn`,
    async()=>{
        try{
            const res = await axios.get('http://localhost:3001/members')
            const data = res.data
            return data
        }catch(err){
            alert(err)
            return
        }
    }
)
 

export const {loginUserFn, logOutFn} =authSlice.actions
export default authSlice