/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import clsx from "clsx";
import RenderSongs from "./SideComponents/RenderSongs";
import { download } from "../imagesAfter/index";
import { SpeakerIcon } from "../icons/index";
import AddSongModal from "./SideComponents/modals/AddSongModal";
import Clock from "./SideComponents/Clock";
import {
  HoangDontSay,
  AviciiWaitingForLove,
  WalkThruFire,
  MidnightKidsFindOurWay,
  PayphonexCallMeMaybe,
  VicetoneNevada,
  Vuong,
} from "../musics";
import {
  RollbackOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleFilled,
  RetweetOutlined,
  PauseCircleFilled,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { Progress } from "antd";
let dashboardHeight;
const $ = document.querySelector.bind(document);
const PlAYER_STORAGE_KEY = "playerStorage";
const MusicPlayer = () => {
  // eslint-disable-next-line no-unused-vars
  const [songs, setSongs] = useState([
    {
      id: "song001",
      name: "HoangDontSay",
      singer: "Raftaar x Fortnite",
      path: HoangDontSay,
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      id: "song002",
      name: "AviciiWaitingForLove",
      singer: "Raftaar x Salim Merchant x Karma",
      path: AviciiWaitingForLove,
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      id: "song003",
      name: "WalkThruFire",
      singer: "Raftaar x Brobha V",
      path: WalkThruFire,
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      id: "song004",
      name: "MidnightKidsFindOurWay",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: MidnightKidsFindOurWay,
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      id: "song005",
      name: "PayphonexCallMeMaybe",
      singer: "Raftaar",
      path: PayphonexCallMeMaybe,
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      id: "song006",
      name: "VicetoneNevada",
      singer: "Raftaar x kr$na",
      path: VicetoneNevada,
      image: "https://bau.vn/wp-content/uploads/2021/09/nam-dj-1024x914.jpg",
    },
    {
      id: "song007",
      name: "HoangDontSay111",
      singer: "Raftaar x Fortnite",
      path: HoangDontSay,
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
    },
    {
      id: "song008",
      name: "AviciiWaitingForLove111",
      singer: "Raftaar x Salim Merchant x Karma",
      path: AviciiWaitingForLove,
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      id: "song009",
      name: "WalkThruFire111",
      singer: "Raftaar x Brobha V",
      path: WalkThruFire,
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      id: "song0010",
      name: "MidnightKidsFindOurWay111",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: MidnightKidsFindOurWay,
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      id: "song0011",
      name: "PayphonexCallMeMaybe111",
      singer: "Raftaar",
      path: PayphonexCallMeMaybe,
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      id: "song0012",
      name: "VicetoneNevada111",
      singer: "Raftaar x kr$na",
      path: VicetoneNevada,
      image: "https://bau.vn/wp-content/uploads/2021/09/nam-dj-1024x914.jpg",
    },
    {
      id: "song0013",
      name: "Vuong ngaos ddas",
      singer: "Vuong",
      path: Vuong,
      image: "https://bau.vn/wp-content/uploads/2021/09/nam-dj-1024x914.jpg",
    },
  ]);
  const [currentSong, setCurrentSong] = useState(songs[0] || {});
  const [currentId, setCurrentId] = useState(songs[0]?.id?songs[0].id:'');
  const [currentVolume, setCurrentVolume] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [playedSongs, setPlayedSongs] = useState([...songs]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [showOptions, setShowOptions] = useState({
    id: "",
    isShow: false,
  });
  const [isShowAddSongModal, setIsShowAddSongModal] = useState(false);
  const cdRef = useRef();
  const audioRef = useRef();
  const dashboardRef = useRef();
  const playlistRef = useRef();
  const cdThumbRef = useRef();
  const progressRef = useRef();
  const timeRef = useRef();
  const config = JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {};
  const setConfig = (key, value) => {
    config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(config));
  };

  useEffect(() => {
    setIsRandom(config?.isRandom ? config.isRandom : isRandom);
    setIsRepeat(config?.isRepeat ? config.isRepeat : isRepeat);
    setCurrentVolume(
      config?.currentVolume ? config.currentVolume : currentVolume
    );
    audioRef.current.volume = Number(currentVolume / 100).toFixed(2);
    if (cdThumbRef.current?.classList) {
      if (isPlaying) {
        audioRef.current.play();
        cdThumbRef.current.classList.add("active");
      } else {
        cdThumbRef.current.classList.remove("active");
      }
    }

    cdRef.current.style.width = "12.5rem";
    const cdWidth = cdRef.current?.offsetWidth;
    dashboardHeight = dashboardRef?.current?.offsetHeight;
    playlistRef.current.style.marginTop = dashboardHeight + "px";
    document.onscroll = function () {
      dashboardHeight = dashboardRef?.current?.offsetHeight;
      playlistRef.current.style.marginTop = dashboardHeight + "px";
      const scrollToTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollToTop;
      if (cdRef.current) {
        cdRef.current.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cdRef.current.style.height = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cdRef.current.style.opacity = newCdWidth / cdWidth;
      }
    };

    if (!isRandom && !config.isRandom) {
      setPlayedSongs([]);
    }
  }, [
    isPlaying,
    isRepeat,
    isRandom,
    songs,
    config.isRandom,
    config.isRepeat,
    currentId,
  ]);
  const handleTogglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleAudioOnPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioOnPause = () => {
    setIsPlaying(false);
  };

  const handleRandomSong = () => {
    let newIndex;
    if (playedSongs.length > 0) {
      newIndex = Math.floor(Math.random() * playedSongs.length);
      setCurrentSong({ ...playedSongs[newIndex] });
      setCurrentId(playedSongs[newIndex]?.id);
      playedSongs.splice(newIndex, 1);
      setPlayedSongs([...playedSongs]);
    } else {
      newIndex = 0;
      setCurrentSong({ ...songs[newIndex] });
      setCurrentId(songs[newIndex]?.id);
      setPlayedSongs([...songs]);
    }
  };

  const handlePrev = () => {
    if (isRandom || config.isRandom) {
      handleRandomSong();
    } else {
      let currentIndex = songs.indexOf(
        songs.find((song) => song.id === currentId)
      );
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = songs.length - 1;
      }
      setCurrentSong({ ...songs[currentIndex] });
      setCurrentId(songs[currentIndex].id);
    }
    scrollToActiveSong();
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (isRandom || config.isRandom) {
      handleRandomSong();
    } else {
      let currentIndex = songs.indexOf(
        songs.find((song) => song.id === currentId)
      );
      currentIndex++;
      if (currentIndex > songs.length - 1) {
        currentIndex = 0;
      }
      setCurrentSong({ ...songs[currentIndex] });
      setCurrentId(songs[currentIndex].id);
    }
    scrollToActiveSong();
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
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
    audioRef.current.currentTime = seekTime;
  };

  const onVolumeChange = (e) => {
    setConfig("currentVolume", e.target.value);
    setCurrentVolume(e.target.value);
    audioRef.current.volume = Number(e.target.value / 100).toFixed(2);
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      setIsPlaying(true);
    } else {
      if (isRandom || config.isRandom) {
        handleRandomSong();
        audioRef.current.currentTime = 0;
        setIsPlaying(true);
      } else {
        let currentIndex = songs.indexOf(
          songs.find((song) => song.id === currentId)
        );
        if (currentIndex === songs.length - 1) {
          audioRef.current.pause();
          return;
        } else {
          handleNext();
        }
      }
    }
    scrollToActiveSong();
  };

  const scrollToActiveSong = () => {
    let ScrollActiveTimeOut;
    clearTimeout(ScrollActiveTimeOut);
    ScrollActiveTimeOut = setTimeout(() => {
      $(".song-item.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 300);
  };
  const handleClickSongItem = (e) => {
    setShowOptions({ id: "", isShow: false });
    const songNode = e.target.closest(".song-item:not(.active)");
    if (songNode && !e.target.closest(".option")&&!e.target.closest(".modal-item-wrapper")) {
      songNode.classList.add("active");
      setCurrentId(songNode.dataset.id);
      const song = songs.find((song) => song.id === songNode.dataset.id);
      setCurrentSong({ ...song });
      setIsPlaying(true);
      scrollToActiveSong();
    }
    //làm redux ở đây, check điều kiện set biến redux, cuối cùng thì dựa trên biến redux mà gọi mấy hàm play, setcurr
  };

  const handleAddSongs = () => {
    setIsShowAddSongModal(true);
  };

  const handleRepeat=({isForceRepeat=false, song=null})=>{
	if(!isForceRepeat){
		setConfig("isRepeat", !isRepeat);
		setIsRepeat((prev) => !prev);
	}else {
		setConfig("isRepeat", true);
		setIsRepeat(true);
		handleRunSongNow(song)
	}
  }
  const handleRunSongNow = (song) => {
    setShowOptions({ id: "", isShow: false });
    setCurrentId(song.id);
    setCurrentSong({ ...song });
    setIsPlaying(true);
    scrollToActiveSong();
  };
  const handleRemoveSong =(idSong)=>{
	//sắp tới nếu thêm xong phương thức thêm bài thì khi xóa hết bài sẽ hiển thị một cái div là hsết baài(arr.length===0 thì render div kia, ngượjc ailj show div)
	const songsClone=[...songs]
	if(songsClone.length){
		const songFound= songsClone.find((song)=>song.id===idSong)
		const indexSongFound= songsClone.indexOf(songFound)
		songsClone.splice(indexSongFound, 1)
		setSongs([...songsClone])
		setPlayedSongs([...songsClone])
		setCurrentSong(songsClone[0])
		setCurrentId(songsClone[0].id);
		setIsPlaying(true);
	}
  }

  return (
    <>
      <div
        className={clsx(
          "player relative mx-auto bg-gray-200",
          isPlaying && "playing"
        )}
        style={{ maxWidth: "30rem", height: "500vh" }}
      >
        <div ref={dashboardRef} className="dashboard p-4 z-10">
          <header className="text-center relative">
            <div className="text-red-500 font-bold">Now playing</div>
            <div className="text-3xl font-bold song-name line-clamp-2 whitespace-pre-line break-words">
              {currentSong?.name
                ? currentSong.name
                : "no current song was choosed"}
            </div>
          </header>
          <div ref={cdRef} className="cd mt-3">
            <img
              ref={cdThumbRef}
              className={clsx("object-cover w-full h-full cdThumb")}
              src={currentSong?.image ? currentSong.image : download}
              alt="card download item"
            />
          </div>
          <div className="control flex justify-around items-center mt-6 text-gray-600">
            <div
              onClick={() => {
                handleRepeat({})
              }}
            >
              <RollbackOutlined
                className={clsx(
                  "btn btn-repeat cursor-pointer text-xl",
                  (isRepeat || config?.isRepeat) && "active"
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
                setIsRandom((prev) => !prev);
                setConfig("isRandom", !isRandom);
              }}
            >
              <RetweetOutlined
                className={clsx(
                  "btn btn-random cursor-pointer text-xl",
                  (isRandom || config?.isRandom) && "active"
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
              style={{ width: "100%", top: "2px" }}
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
                style={{ width: "84%", top: "4px" }}
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
            src={currentSong?.path || ""}
          />
          <div
            className="add-songs cursor-pointer mt-4"
            onClick={handleAddSongs}
          >
            <AppstoreAddOutlined className="text-red-400 text-lg" />
          </div>
        </div>
        <RenderSongs
          currentId={currentId}
          songs={songs}
          handleClickSongItem={handleClickSongItem}
          playlistRef={playlistRef}
          isPlaying={isPlaying}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
		  scrollToActiveSong={scrollToActiveSong}
		  setIsPlaying={setIsPlaying}
		  setCurrentSong={setCurrentSong}
		  setCurrentId={setCurrentId}
		  handleRepeat={handleRepeat}
		  handleRunSongNow={handleRunSongNow}
		  handleRemoveSong={handleRemoveSong}
        />
      </div>
      <AddSongModal
        isShow={isShowAddSongModal}
        setIsShowAddSongModal={setIsShowAddSongModal}
      />
    </>
  );
};

export default MusicPlayer;
