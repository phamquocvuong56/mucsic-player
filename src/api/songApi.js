import axiosClient from "./axiosClient"

const songApi={
    uploadSong: (data)=>{
        const url='/upload-songs'
        return axiosClient.post(url, data)
    },
}
export default songApi