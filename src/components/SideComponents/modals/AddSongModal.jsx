import { Modal } from 'antd';
import React from 'react';

const AddSongModal = ({ isShow, setIsShowAddSongModal }) => {
	return (
		<Modal
			open={isShow}
			title="Add song"
			onCancel={() => {
				setIsShowAddSongModal(false);
			}}
			onOk={() => {
				setIsShowAddSongModal(false);
			}}
		>
			{/* <Form form={form}></Form> */}
			this is modal
		</Modal>
	);
};

export default AddSongModal;
