import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isRandom: false,
  isRepeat: false,
  isPlaying:false,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setRandom: (state, action)=>{
      state.isRandom= action.payload
    },
    setRepeat: (state, action)=>{
      state.isRepeat= action.payload
    },
    setPlaying: (state, action)=>{
      state.isPlaying= action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRandom,setRepeat,setPlaying } = dashboardSlice.actions

export default dashboardSlice.reducer