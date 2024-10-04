import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initState ={
  fruitItems: [],
  vegetableItems: [],
  snackItems: [],
  meatItems: [],
  members: [],
  items: []
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: initState,
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAdminMemberFn.pending, (state, action) => { //대기 상태 -> 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminMemberFn.fulfilled, (state, action) => {
      state.members = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminMemberFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAdminFruitFn.pending, (state, action) => { //대기 상태 -> 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminFruitFn.fulfilled, (state, action) => {
      state.fruitItems = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminFruitFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
  }
  
})

export const asyncAdminMemberFn = createAsyncThunk(`admin/asyncAdminMemberFn`,
  async () => {
    try {
      const res = await axios.get('http://localhost:3001/members')
      const data = res.data
      return data
    } catch (err) {
      alert(err)
      return
    }
  }
)

export const asyncAdminFruitFn = createAsyncThunk(`admin/asyncAdminFruitFn`,
  async () => {
    try {
      const res = await axios.get('http://localhost:3001/fruitItems')
      const data = res.data
      return data
    } catch (err) {
      alert(err)
      return
    }
  }
)

export const asyncAdminvegetableItemsFn = createAsyncThunk(`admin/asyncAdminvegetableItemsFn`,
  async () => {
    try {
      const res = await axios.get('http://localhost:3001/vegetableItems')
      const data = res.data
      return data
    } catch (err) {
      alert(err)
      return
    }
  }
)

export default adminSlice
