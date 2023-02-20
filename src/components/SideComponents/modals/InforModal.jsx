import React from 'react'
import { setModal } from "../../../redux/modal/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import {CloseModalIcon} from '../../../icons/index'
import './InfoModal.scss'
const InforModal = () => {
  const dispatch=useDispatch()
  const modalState = useSelector((state) => state.modal);
  return (
    <div className='wrapper'>
      <div className='modal'>
        <div className="close" onClick={()=>{dispatch(setModal({isShow:false, title:'',content:''}))}}><CloseModalIcon className='text-2xl'/></div>
          <div className="title">{modalState.title}</div>
          <div className="content">{modalState.content}</div>
      </div>
    </div>
  )
}

export default InforModal