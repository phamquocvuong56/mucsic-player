const SetDefaultConfig=(storageKey)=>{
  localStorage.setItem(storageKey, {
    isPlaying:false,
    isRandom:false,
    songs:[],
    isRepeat:false,
    currentSong:{},
    currentVolume:0
  })
}
export default SetDefaultConfig