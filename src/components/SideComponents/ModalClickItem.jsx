import React from "react";

const ModalClickItem = ({
  handleRunSongNow,
  handleRepeat,
  handleRemoveSong,
  handleDownloadSong
}) => {
  return (
    <div className="modal-item-wrapper">
      <ul>
        <li
          onClick={(e) => {
            handleRunSongNow();
          }}
        >
          Play
        </li>
        <li onClick={handleRepeat}>Repeat</li>
        <li onClick={handleDownloadSong}>Download</li>
        <li onClick={handleRemoveSong}>Remove</li>
      </ul>
    </div>
  );
};

export default ModalClickItem;
