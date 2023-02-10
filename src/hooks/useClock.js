import { useEffect, useState } from 'react';

const useClock = () => {
	const [clock, setClock] = useState('');
	const formatTime = (date) => {
		const hours = `0${date.getHours()}`.slice(-2);
		const minutes = `0${date.getMinutes()}`.slice(-2);
		const seconds = `0${date.getSeconds()}`.slice(-2);
		return `${hours}:${minutes}:${seconds}`;
	};
	useEffect(() => {
		const timeStamp = setInterval(() => {
			const clock = formatTime(new Date());
			setClock(clock);
		}, 1000);
		return () => {
			clearInterval(timeStamp);
		};
	}, []);
	return clock;
};

export default useClock;
