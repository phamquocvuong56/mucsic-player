import React from 'react';
import useClock from '../../hooks/useClock';
const Clock = (props) => {
	const clock = useClock();
	return <div {...props}>{clock}</div>;
};

export default Clock;
