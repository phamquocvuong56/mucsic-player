import axiosClient from "./axiosClient"

const songApi={
    uploadSong: (data)=>{
        console.log('vao day')
        const url='/upload-songs'
        return axiosClient.post(url, data)
    },
}
export default songApi