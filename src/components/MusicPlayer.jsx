/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppstoreAddOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
  RetweetOutlined,
  RollbackOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Progress } from "antd";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoIcon, SpeakerIcon } from "../icons/index";
import { Image1 } from "../images";
import Intro from "./intro/Intro";
import Clock from "./SideComponents/Clock";
import AddSongModal from "./SideComponents/modals/AddSongModal";
import RenderSongs from "./SideComponents/RenderSongs";
import Tooltip from "./tooltip/Tooltip";
import {SetConfig,GetConfig} from "../localStorage/LocalConfig";
import {PlAYER_STORAGE_KEY} from '../localStorage/LocalKeys'
import {
  setRandom,
  setRepeat,
  setPlaying,
} from "../redux/dashboard/DashboardSlice";
import { setCurrentSong, setIsShowAddSongModal,setSong } from "../redux/song/SongSlice";
// const $ = document.querySelector.bind(document);

export const MusicLoader = async () => {
  const res = await fetch(
    "https://my-json-server.typicode.com/typicode/demo/db"
  );
  const data = await res.json();
  return data;
};
const MusicPlayer = () => {
  const { isRandom, isPlaying, isRepeat } = useSelector(
    (state) => state.dashboard
  );
  const { currentSong, songs } = useSelector(
    (state) => state.song
  );
  const dispatch = useDispatch();
  //in the future, make redux api for songs
  const [currentVolume, setCurrentVolume] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [playedSongs, setPlayedSongs] = useState([...songs]);
  // const [isScrollToActiveSong, setIsScrollToActiveSong] = useState(false);
  const [showOptions, setShowOptions] = useState({
    id: "",
    isShow: false,
  });
  const cdRef = useRef();
  const audioRef = useRef();
  const dashboardRef = useRef();
  const playlistRef = useRef();
  const cdThumbRef = useRef();
  const progressRef = useRef();
  const timeRef = useRef();
  const config = GetConfig(PlAYER_STORAGE_KEY);

  useEffect(() => {
    dispatch(setCurrentSong(config.currentSong||songs[0]));
    dispatch(setSong(config?.songs?[...config.songs]:[]))
    dispatch(setRandom(config.isRandom));
    dispatch(setRepeat(config.isRepeat));
    setCurrentVolume(config.currentVolume||0);
    if(audioRef){
      audioRef.current.volume = Number(config.currentVolume / 100).toFixed(2)>0?Number(config.currentVolume / 100).toFixed(2):1;
    }
  }, []);
  useEffect(() => {
    if (!isRandom && !config.isRandom) {
      setPlayedSongs([]);
    }
  }, [isRandom]);

  useEffect(() => {
    if(songs.length===0){
      dispatch(setPlaying(false))
    }
    if (cdThumbRef.current?.classList) {
      if (isPlaying&&songs.length>0) {
        audioRef.current.play();
        cdThumbRef.current.classList.add("active");
      } else {
        cdThumbRef.current.classList.remove("active");
      }
    }
    cdRef.current.style.width = "12.5rem";
    cdRef.current.style.height = "12.5rem";
    cdRef.current.style.opacity = 1;
    // window.scrollTo(0, 0);
    const cdWidth = 200;
    playlistRef.current.style.marginTop = "510px";
    const scrollCallback = () => {
      // if (!isScrollToActiveSong) {
      const scrollToTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollToTop;
      if (cdRef.current) {
        cdRef.current.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cdRef.current.style.height = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cdRef.current.style.opacity = newCdWidth / cdWidth;
      }
      // }
    };
    document.removeEventListener("scroll", scrollCallback);
    document.addEventListener("scroll", scrollCallback);
  }, [
    isPlaying,
    songs,
    currentSong,
    // isScrollToActiveSong,
  ]);
  const handleTogglePlay = () => {
    if(songs.length){
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleAudioOnPlay = () => {
    dispatch(setPlaying(true));
  };

  const handleAudioOnPause = () => {
    dispatch(setPlaying(false));
  };
  const setCurrentSongPlay = (song) => {
    dispatch(setCurrentSong(song));
    SetConfig(PlAYER_STORAGE_KEY,'currentSong', song)
  };
  const handleRandomSong = () => {
    let newIndex;
    if (playedSongs.length > 0) {
      newIndex = Math.floor(Math.random() * playedSongs.length);
      setCurrentSongPlay({ ...playedSongs[newIndex] });
      playedSongs.splice(newIndex, 1);
      setPlayedSongs([...playedSongs]);
    } else {
      newIndex = 0;
      setCurrentSongPlay({ ...songs[newIndex] });
      setPlayedSongs([...songs]);
    }
  };

  const handlePrev = () => {
    if (isRandom) {
      handleRandomSong();
    } else {
      let currentIndex = songs.indexOf(
        songs.find((song) => song.id === currentSong.id)
      );
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = songs.length - 1;
      }
      setCurrentSongPlay({ ...songs[currentIndex] });
    }
    // scrollToActiveSong();
    audioRef.current.currentTime = 0;
    dispatch(setPlaying(true));
  };

  const handleNext = () => {
    if (isRandom) {
      handleRandomSong();
    } else {
      let currentIndex = songs.indexOf(
        songs.find((song) => song.id === currentSong.id)
      );
      currentIndex++;
      if (currentIndex > songs.length - 1) {
        currentIndex = 0;
      }
      setCurrentSongPlay({ ...songs[currentIndex] });
    }
    // scrollToActiveSong();
    audioRef.current.currentTime = 0;
    dispatch(setPlaying(true));
  };

  const handleTime = (value) => {
    let minute = Math.floor(value / 60).toFixed(0);
    let second = Math.floor(value - minute * 60).toFixed(0);
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    return `${minute}:${second}`;
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current.duration) {
      timeRef.current.innerText = `${handleTime(
        audioRef.current.currentTime
      )}/${handleTime(audioRef.current.duration)}`;
      const progressPercent = Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      progressRef.current.value = progressPercent;
      setCurrentPercent(progressPercent);
    }
  };

  const onProgressChange = (e) => {
    const seekTime = (audioRef.current.duration / 100) * e.target.value;
    if(seekTime){
      audioRef.current.currentTime = seekTime;
    }
  };

  const onVolumeChange = (e) => {
    SetConfig(PlAYER_STORAGE_KEY,"currentVolume", e.target.value);
    setCurrentVolume(e.target.value);
    audioRef.current.volume = Number(e.target.value / 100).toFixed(2);
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      dispatch(setPlaying(true));
    } else {
      if (isRandom) {
        handleRandomSong();
        audioRef.current.currentTime = 0;
        dispatch(setPlaying(true));
      } else {
        let currentIndex = songs.indexOf(
          songs.find((song) => song.id === currentSong.id)
        );
        if (currentIndex === songs.length - 1) {
          audioRef.current.pause();
          return;
        } else {
          handleNext();
        }
      }
    }
    // scrollToActiveSong();
  };

  // const scrollToActiveSong = () => {
  //   setIsScrollToActiveSong(true);
  //   let ScrollActiveTimeOut;
  //   clearTimeout(ScrollActiveTimeOut);
  //   ScrollActiveTimeOut = setTimeout(() => {
  //     $(".song-item.active").scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //       inline: "nearest",
  //     });
  //     setIsScrollToActiveSong(false);
  //   }, 300);
  // };
  const handleClickSongItem = (e) => {
    setShowOptions({ id: "", isShow: false });
    const songNode = e.target.closest(".song-item:not(.active)");
    if (
      songNode &&
      !e.target.closest(".option") &&
      !e.target.closest(".modal-item-wrapper")
    ) {
      songNode.classList.add("active");
      const song = songs.find((song) => song.id === songNode.dataset.id);
      setCurrentSongPlay({ ...song });
      dispatch(setPlaying(true));
      // scrollToActiveSong();
    }
  };

  const handleAddSongs = () => {
    dispatch(setIsShowAddSongModal(true));
  };

  const handleRepeat = ({ isForceRepeat = false, song = null }) => {
    if (!isForceRepeat) {
      SetConfig(PlAYER_STORAGE_KEY,"isRepeat", !isRepeat);
      dispatch(setRepeat(!isRepeat));
      if (!isRepeat) {
        dispatch(setRandom(false));
        SetConfig(PlAYER_STORAGE_KEY,"isRandom", false);
      }
    } else {
      SetConfig(PlAYER_STORAGE_KEY,"isRepeat", true);
      dispatch(setRepeat(true));
      dispatch(setRandom(false));
      SetConfig(PlAYER_STORAGE_KEY,"isRandom", false);
      handleRunSongNow(song);
    }
  };
  const handleRunSongNow = (song) => {
    setShowOptions({ id: "", isShow: false });
    setCurrentSongPlay({ ...song });
    dispatch(setPlaying(true));
    // scrollToActiveSong();
  };
  const handleDownloadSong= async(songUrl)=>{
    await fetch(songUrl).then(res=>res.blob()).then(file=>{
      let tempUrl= URL.createObjectURL(file)
      let aTag= document.createElement('a');
      aTag.href=tempUrl;
      aTag.download= songUrl.replace(/^.*[\\/]/, '')
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempUrl);
    })
  }
  const handleRemoveSong = (idSong) => {
    //sắp tới nếu thêm xong phương thức thêm bài thì khi xóa hết bài sẽ hiển thị một cái div là hsết baài(arr.length===0 thì render div kia, ngượjc ailj show div)
    const songsClone = [...songs];
    if (songsClone.length) {
      const songFound = songsClone.find((song) => song.id === idSong);
      const indexSongFound = songsClone.indexOf(songFound);
      songsClone.splice(indexSongFound, 1);
      dispatch(setSong([...songsClone]));
      SetConfig(PlAYER_STORAGE_KEY, 'songs', [...songsClone])
      setPlayedSongs([...songsClone]);
      if(songsClone.length){
        setCurrentSongPlay(songsClone[0]);
        dispatch(setPlaying(true));
      }
    }
  };
  return (
    <>
      <Intro />
      <LogoIcon
        className="logo-icon-side-left fixed"
        style={{ fontSize: "150px", zIndex: 101 }}
      />
      <LogoIcon
        className="logo-icon-side-right fixed"
        style={{ fontSize: "150px", zIndex: 101 }}
      />
      <div
        className={clsx(
          "player relative mx-auto bg-gray-200 custom-cursor",
          isPlaying && "playing"
        )}
        style={{ maxWidth: "30rem", minHeight: "100vh" }}
      >
        <div ref={dashboardRef} className="dashboard p-4 z-10">
          <header className="text-center relative">
            <div className="text-red-500 font-bold">Now playing</div>
            <Tooltip
              direction="bottom"
              delay="200"
              className="w-full"
              content={`${currentSong?.name || "Failed to load song name."}`}
            >
              <div className="text-3xl font-bold p-2 overflow-hidden text-white song-name line-clamp-1 whitespace-nowrap text-ellipsis">
                {currentSong?.name ? currentSong.name : "no song was chose!"}
              </div>
            </Tooltip>
          </header>
          <div ref={cdRef} className="cd mt-3">
            <img
              ref={cdThumbRef}
              className={clsx("object-cover w-full h-full cdThumb")}
              src={currentSong?.avt ? currentSong.avt : Image1}
              alt="card download item"
            />
          </div>
          <div className="control flex justify-around items-center mt-6 text-gray-600">
            <div
              onClick={() => {
                handleRepeat({});
              }}
            >
              <RollbackOutlined
                className={clsx(
                  "btn btn-repeat cursor-pointer text-xl",
                  isRepeat && "active"
                )}
              />
            </div>
            <div onClick={handlePrev}>
              <StepBackwardOutlined className="btn btn-prev cursor-pointer text-xl" />
            </div>
            <div
              onClick={() => {
                handleTogglePlay();
              }}
              className="btn-toggle-play"
            >
              {isPlaying ? (
                <PauseCircleFilled className="btn btn-play shadow-btn cursor-pointer text-4xl text-pink-600" />
              ) : (
                <PlayCircleFilled className="btn btn-pause shadow-btn cursor-pointer text-4xl text-pink-600" />
              )}
            </div>
            <div onClick={handleNext}>
              <StepForwardOutlined className="btn btn-next cursor-pointer text-xl" />
            </div>
            <div
              onClick={() => {
                dispatch(setRandom(!isRandom));
              SetConfig(PlAYER_STORAGE_KEY,"isRandom", !isRandom);
                if (!isRandom) {
                  dispatch(setRepeat(false));
                SetConfig(PlAYER_STORAGE_KEY,"isRepeat", false);
                }
              }}
            >
              <RetweetOutlined
                className={clsx(
                  "btn btn-random cursor-pointer text-xl",
                  isRandom && "active"
                )}
              />
            </div>
          </div>
          <span className="relative">
            <input
              onChange={(e) => {
                onProgressChange(e);
              }}
              ref={progressRef}
              className="progress w-full cursor-pointer z-2"
              type="range"
              step={1}
              value={
                audioRef?.current?.duration
                  ? Math.floor(
                      (audioRef?.current?.currentTime /
                        audioRef.current.duration) *
                        100
                    )
                  : 0
              }
              min={0}
              max={100}
            />
            <Progress
              className="absolute right-0"
              style={{ width: "100%", top: "3px" }}
              percent={
                currentPercent === 100
                  ? currentPercent
                  : currentPercent < 50
                  ? currentPercent + 1
                  : currentPercent - 1
              }
              showInfo={false}
              strokeColor="#db2777"
              trailColor="#fff"
            />
          </span>
          <div className="flex justify-between">
            <span className="flex">
              <span className="music-time-stamp" ref={timeRef}>
                00/00
              </span>
              <Clock className="ml-2 music-time-stamp" />
            </span>
            <span className="flex items-center relative">
              <SpeakerIcon className="text-2xl text-orange-500 flex items-center" />
              <input
                className="cursor-pointer volume z-2"
                type="range"
                onChange={(e) => {
                  onVolumeChange(e);
                }}
                step={1}
                value={currentVolume}
                min={0}
                max={100}
              />
              <Progress
                className="absolute right-0"
                style={{ width: "84%", top: "3px" }}
                percent={currentVolume}
                showInfo={false}
                strokeColor="#f97316"
                trailColor="#fff"
              />
            </span>
          </div>
          <audio
            onPlay={handleAudioOnPlay}
            onPause={handleAudioOnPause}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            ref={audioRef}
            className="audio"
            src={currentSong?.url || ""}
          />
          <div
            className="add-songs cursor-pointer mt-4"
            onClick={handleAddSongs}
          >
            <AppstoreAddOutlined className="text-red-400 text-lg" />
          </div>
        </div>
        <RenderSongs
          currentId={currentSong?.id}
          songs={songs}
          handleClickSongItem={handleClickSongItem}
          playlistRef={playlistRef}
          isPlaying={isPlaying}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          handleRepeat={handleRepeat}
          handleRunSongNow={handleRunSongNow}
          handleRemoveSong={handleRemoveSong}
          handleDownloadSong={handleDownloadSong}
        />
      </div>
      <AddSongModal />
    </>
  );
};

export default MusicPlayer;
