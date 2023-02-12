import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentSong:{},
    isShowAddSongModal:false,
}

export const songSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentSong: (state, action)=>{
      state.currentSong= action.payload
    },
    setIsShowAddSongModal: (state, action)=>{
      state.isShowAddSongModal= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong,setIsShowAddSongModal } = songSlice.actions

export default songSlice.reducer