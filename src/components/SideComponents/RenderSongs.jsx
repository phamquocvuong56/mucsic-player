import React from 'react';
import { clsx } from 'clsx';
import { DashOutlined } from '@ant-design/icons';

const RenderSongs = ({
	songs,
	handleClickSongItem,
	playlistRef,
	currentId,
	isPlaying,
}) => {
	return (
		<div
			onClick={handleClickSongItem}
			ref={playlistRef}
			className="playlist p-4 flex flex-col space-y-3"
		>
			{songs?.length > 0 &&
				songs.map((song) => (
					<li
						key={song.id}
						data-id={song.id}
						className={clsx(
							'song-item flex justify-between px-5 py-3 items-center bg-white rounded-lg cursor-pointer shadow-lg',
							currentId === song.id && 'active'
						)}
					>
						<div className="flex space-x-4 items-center">
							<img
								src={song.image}
								alt=""
								className={clsx(
									'object-cover w-full rounded-full avt-img',
									isPlaying && currentId === song.id && 'active'
								)}
								style={{
									width: '36px',
									height: '36px',
								}}
							/>
							<div className="flex flex-col justify-center">
								<h3 className="mb-0 font-bold">{song.name}</h3>
								<p className="mb-0 text-sm song-sub-title">{song.singer}</p>
							</div>
						</div>
						<div>
							<DashOutlined className="font-bold option"></DashOutlined>
						</div>
					</li>
				))}
		</div>
	);
};

export default RenderSongs;
