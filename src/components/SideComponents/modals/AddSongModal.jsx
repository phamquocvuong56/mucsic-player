import { Modal } from 'antd';
import React from 'react';
import { setIsShowAddSongModal } from "../../../redux/song/SongSlice";
import { useDispatch, useSelector } from "react-redux";
const AddSongModal = () => {
	const dispatch= useDispatch()
	const {isShowAddSongModal} = useSelector((state)=>state.song)
	return (
		<Modal
			open={isShowAddSongModal}
			title="Add song"
			onCancel={() => {
				dispatch(setIsShowAddSongModal(false));
			}}
			onOk={() => {
				dispatch(setIsShowAddSongModal(false));
			}}
		>
			{/* <Form form={form}></Form> */}
			this is modal
		</Modal>
	);
};

export default AddSongModal;
