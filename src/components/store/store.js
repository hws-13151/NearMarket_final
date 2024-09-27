import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import cartSlice3 from '../slice/cartSlice3'

const store = configureStore({
    reducer:{
        cart3:cartSlice3.reducer
    }
})

export default store