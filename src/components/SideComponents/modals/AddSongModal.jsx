import React, { useEffect, useRef, useState } from "react";
import { setIsShowAddSongModal, setSong } from "../../../redux/song/SongSlice";
import { setModal } from "../../../redux/modal/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AddSongModal.scss";
import { uploadImage, Image1 } from "../../../images/index";
import { CloseIcon } from "../../../icons/index";
import axios from "axios";
import { Loading, InforModal } from "../../../components/index";
import { SetConfig } from "../../../localStorage/LocalConfig";
import { PlAYER_STORAGE_KEY } from "../../../localStorage/LocalKeys";
const AddSongModal = () => {
  const [fileName, setFileName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef();
  const imgRef = useRef();
  const avatarRef = useRef();
  const formRef = useRef();
  const songNameRef = useRef();
  const songNameErrRef = useRef();
  const authorRef = useRef();
  const authorErrRef = useRef();
  const dispatch = useDispatch();
  const { isShowAddSongModal, songs } = useSelector((state) => state.song);
  const modalState = useSelector((state) => state.modal);
  useEffect(() => {
    if(fileRef?.current){
      fileRef.current.value = "";
    }
    setImgUrl("");
    setFileName("");
  }, [isShowAddSongModal]);
  const handleChooseFileClick = () => {
    if (fileRef) {
      fileRef.current.click();
    }
  };
  const handleChooseImage = () => {
    if (imgRef) {
      imgRef.current.click();
    }
  };
  const previewImgChange = () => {
    if (imgRef?.current?.files[0]) {
      setImgUrl(URL.createObjectURL(imgRef?.current?.files[0]));
    }
  };
  const validateForm = () => {
    let check = true;
    songNameErrRef.current.classList.remove("display");
    authorErrRef.current.classList.remove("display");
    if (songNameRef.current.value === "") {
      check = false;
      songNameErrRef.current.classList.add("display");
      songNameRef.current.focus();
    }
    if (authorRef.current.value === "") {
      check = false;
      authorErrRef.current.classList.add("display");
      authorRef.current.focus();
    }
    return check;
  };
  const handleSongNameChange = () => {
    songNameErrRef.current.classList.remove("display");
  };
  const handleFileChange = () => {
    if (fileRef?.current?.files[0]) {
      setFileName(fileRef.current.files[0].name);
    }
  };
  const handleAuthorChange = () => {
    authorErrRef.current.classList.remove("display");
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (fileRef.current && validateForm()) {
      const files = fileRef.current.files;
      const avt = imgRef.current.files[0];
      const formData = new FormData();
      if (files) {
        Object.keys(files).forEach((key) => {
          formData.append(files[key].name, files[key]);
        });
      }
      if (avt) {
        formData.append(avt.name, avt);
      }
      formData.append("songName", songNameRef.current.value);
      formData.append("authorName", authorRef.current.value);
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}upload-songs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let dataPopup = {};
      if (res?.data?.data?.length) {
        const existSong = songs.some((item) => item.id === res.data.data[0].id);
        if (existSong) {
          dataPopup.isShow = true;
          dataPopup.title = "Existing song!";
          dataPopup.content = `file ${res.data.data[0].id}.mp3 has already exist!!!`;
        } else {
          dataPopup.isShow = true;
          dataPopup.title = "Successful!";
          dataPopup.content = `File upload Successful !!!`;
          dispatch(setSong([...songs, res.data.data[0]]));
          SetConfig(PlAYER_STORAGE_KEY, "songs", [...songs, res.data.data[0]]);
        }
      } else {
        if (res?.data?.status === "error") {
          dataPopup.isShow = true;
          dataPopup.title = "Error!";
          dataPopup.content = res.data.message;
        }
      }
      dispatch(setModal(dataPopup));
      setIsLoading(false);

      // const res= await songApi.uploadSong(formData)
      fileRef.current.value = "";
      setImgUrl("");
      setFileName("");
      if(songNameRef?.current) songNameRef.current.value=''
      if(authorRef?.current) authorRef.current.value=''
    }
    //upload file
  };
  return (
    <>
      {isShowAddSongModal && (
        <>
          {modalState.isShow && <InforModal />}
          {isLoading && <Loading />}
          <div className="bg-cover"></div>
          <div className="modal-add-song">
            <div
              className="close-btn"
              onClick={() => {
                dispatch(setIsShowAddSongModal(false));
              }}
            >
              <CloseIcon className="text-4xl" />
            </div>
            <form
              action=""
              ref={formRef}
              className="form"
              encType="multipart/form-data"
            >
              <div className="form-item">
                <div className="form-control">
                  <div className="file-area" onClick={handleChooseFileClick}>
                    <img src={uploadImage} alt="upload img" />
                  </div>
                  <div className="file-preview">
                    <div className="file-preview-avt">
                      <img
                        className="w-full h-full object-cover"
                        src={imgUrl || Image1}
                        alt=""
                      />
                    </div>
                    <div className="file-name overflow-hidden line-clamp-2 break-words whitespace-pre-line text-ellipsis">
                      {fileName || "No song chose!"}
                    </div>
                  </div>
                  <input
                    onChange={handleFileChange}
                    ref={fileRef}
                    type="file"
                    id="file"
                    accept="audio/*"
                  />
                </div>
              </div>
              <div className="form-item">
                <div className="form-control">
                  <div className="avatar" onClick={handleChooseImage}>
                    Choose image
                  </div>
                  <div className="w-full">
                    <div className="img-preview">
                      <img
                        ref={avatarRef}
                        id="avatar-preview"
                        src={imgUrl || Image1}
                        alt="avatar preview"
                      />
                    </div>
                  </div>
                  <input
                    className="hidden absolute"
                    onChange={previewImgChange}
                    ref={imgRef}
                    type="file"
                    id="preview"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="form-item -mt-4 w-full">
                <div className="form-control">
                  <label htmlFor="name">Song name</label>
                  <input
                    onChange={handleSongNameChange}
                    ref={songNameRef}
                    type="text"
                    id="name"
                    placeholder="Type song name..."
                  />
                </div>
                <span ref={songNameErrRef} className="form-error">
                  Song name is required!!!
                </span>
              </div>
              <div className="form-item -mt-2 w-full">
                <div className="form-control">
                  <label htmlFor="author">Author</label>
                  <input
                    onChange={handleAuthorChange}
                    ref={authorRef}
                    type="text"
                    id="author"
                    placeholder="Type author name..."
                  />
                </div>
                <span ref={authorErrRef} className="form-error">
                  Author name is required!!!
                </span>
              </div>
              <button
                className="py-1 w-full"
                type="submit"
                onClick={(e) => {
                  handleSubmitFile(e);
                }}
              >
                Upload
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddSongModal;
