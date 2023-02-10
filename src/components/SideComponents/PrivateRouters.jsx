import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setAuthValue } from '../redux/SetAuthSlice';
const PrivateRouters = () => {
	const authValue = useSelector(setAuthValue);
	return authValue ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouters;
