import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initState ={
  fruitItems: [],
  vegetableItems: [],
  snackItems: [],
  meatItems: [],
  members: []
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: initState,
  reducers:{},
  extraReducers: (builder) => {
    //members reducers
    builder.addCase(asyncAdminMemberFn.pending, (state, action) => { 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminMemberFn.fulfilled, (state, action) => {
      state.members = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminMemberFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
    //fruitItems reducers
    builder.addCase(asyncAdminFruitFn.pending, (state, action) => { 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminFruitFn.fulfilled, (state, action) => {
      state.fruitItems = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminFruitFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
    //vegetableItems reducers
    builder.addCase(asyncAdminVegetableItemsFn.pending, (state, action) => { 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminVegetableItemsFn.fulfilled, (state, action) => {
      state.vegetableItems = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminVegetableItemsFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
    //snackItems reducers
    builder.addCase(asyncAdminSnackItemsFn.pending, (state, action) => { 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminSnackItemsFn.fulfilled, (state, action) => {
      state.snackItems = action.payload
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminSnackItemsFn.rejected, (state, action) => {
      state.status = 'Fail!!' // rejected!
    })
    //meatItems reducers
    builder.addCase(asyncAdminMeatItemsFn.pending, (state, action) => { 
      state.status = 'Pending' // 대기상태
    })
    builder.addCase(asyncAdminMeatItemsFn.fulfilled, (state, action) => {
      state.meatItems = action.payload // 수정
      state.status = 'Complete' // Success!
    })
    builder.addCase(asyncAdminMeatItemsFn.rejected, (state, action) => {
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

export const asyncAdminVegetableItemsFn = createAsyncThunk(`admin/asyncAdminvegetableItemsFn`,
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

export const asyncAdminSnackItemsFn = createAsyncThunk(`admin/asyncAdminsnackItemsFn`,
  async () => {
    try {
      const res = await axios.get('http://localhost:3001/snackItems')
      const data = res.data
      return data
    } catch (err) {
      alert(err)
      return
    }
  }
)

export const asyncAdminMeatItemsFn = createAsyncThunk(`admin/asyncAdminmeatItemsFn`,
  async () => {
    try {
      const res = await axios.get('http://localhost:3001/meatItems')
      console.log(res.data);
      const data = res.data
      return data
    } catch (err) {
      alert(err)
      return
    }
  }
)

export default adminSlice
