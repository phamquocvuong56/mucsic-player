import React from 'react';
import { Outlet } from 'react-router-dom';

const NestedRoutes = () => {
	return (
		<div>
			<h1>NestedRoutes</h1>
			<Outlet />
		</div>
	);
};

export default NestedRoutes;
