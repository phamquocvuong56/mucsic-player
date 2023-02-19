import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentSong:{},
    isShowAddSongModal:false,
    songs:[]
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
    setSong: (state, action)=>{
      state.songs= JSON.parse(JSON.stringify(action.payload))
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong,setIsShowAddSongModal, setSong } = songSlice.actions
export default songSlice.reducer