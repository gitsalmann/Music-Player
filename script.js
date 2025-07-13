let songName = document.querySelector("#song-name")
let songSinger = document.querySelector("#song-singer")
let songImage = document.querySelector(".song-image")
let volumeRange = document.querySelector("#volume-range")
let songRange = document.querySelector("#song-duration")
let volumeSvg = document.querySelector("#vol-svg")
let musicAnim = document.querySelector("#music-anim")
let playPauseImg = document.querySelector("#play-pause")
let playlistImg = document.querySelector('#playlist-img')
let playlist = document.querySelector('.playlist')
let playlistSong = document.querySelectorAll(".playlist-song")


let index = 0;
let playingSong = false
let track = document.createElement("audio")


let songs = [
  {
    name:"Ve Kamleya",
    path:"kamleya.mp3",
    image:"kamleya.jpg",
    singer:"Arijit Singh"
  },
  {
    name:"Besos",
    path:"besos.mp3",
    image:"besos.jpg",
    singer:"Shreya Ghosal & Karl Wine"
  },
  {
    name:"Pink Venom",
    path:"pink venom.mp3",
    image:"bpink.jpg",
    singer:"Black Pink"
  },
]

function loadTrack(index){
  track.src = songs[index].path
  songName.innerHTML = songs[index].name
  songSinger.innerHTML = songs[index].singer
  songImage.style = `background-image: url("${songs[index].image}");`
  volume()
  duration()
  setInterval(() => {
    songRange.max = track.duration
    songRange.value = track.currentTime
  }, 1000)
  track.loop = true
  track.load()
}
loadTrack(index)




function playPause(){
  if(playingSong == false){
    playSong()
  }else{
    pauseSong()
  }
}

function playSong(){
  track.play()
  playingSong = true
  playPauseImg.src = "pause.svg"
  musicAnim.style.display = "block"
}

function pauseSong(){
  track.pause()
  playingSong = false
  playPauseImg.src = "play.svg"
  musicAnim.style.display = "none"
}

function nextSong(){
  if(index < songs.length-1){
    index++
    loadTrack(index)
    playSong()
  }else{
    index=0
    loadTrack(index)
    playSong()

  }
}

function previousSong(){
  if(index > 0){
    index--
    loadTrack(index)
    playSong()
  }else{
    index= songs.length-1
    loadTrack(index)
    playSong()

  }
}

function volume(){
track.volume = volumeRange.value/100
if(volumeRange.value == 0){
  volumeSvg.src = "mute.svg"
}else{
  volumeSvg.src = "volume.svg"
}
}

function duration(){
  track.currentTime = songRange.value
}

playlistImg.addEventListener('click', ()=>{
  playlist.classList.toggle("playlist-active")
  if(playlist.classList.contains("playlist-active")){
    playlistImg.src = "cross.svg"
  }else{
    playlistImg.src = "playlist.svg"
  }
})

playlistSong.forEach((song,index)=>{
  song.addEventListener('click',()=>{
    loadTrack(index)
    playSong()
      playlist.classList.remove("playlist-active")
  })
})