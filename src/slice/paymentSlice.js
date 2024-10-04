import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React from 'react'

const initState ={  
    paymentItems:[]
};


const paymentSlice = createSlice({
    name: "payment",
    initialState: initState,
    reducers:{
        
        }
    }
    
)






export default paymentSlice