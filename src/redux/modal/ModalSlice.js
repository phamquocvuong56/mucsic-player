import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShow:false,
    title:'',
    content:''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action)=>{
      state.isShow= action.payload.isShow
      state.title= action.payload.title
      state.content= action.payload.content
    },
  },
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer