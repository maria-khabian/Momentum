import playList from './playList.js';

const audio = new Audio();
audio.volume = '0.3'
// console.log(audio.duration)

const buttonPlay = document.querySelector('.play');
const buttonPrev = document.querySelector('.play-prev');
const buttonNext = document.querySelector('.play-next');
const timeline = document.querySelector('.timeline');
const timelineProgress = document.querySelector('.timeline-progress')
const timeAudioDuration = document.querySelector('.time-audio-duration');
const timeAudioCurrent = document.querySelector('.time-audio-current');
const nameAudio = document.querySelector('.name-audio')
const playListContainer = document.querySelector('.play-list');
const volumeIcon = document.querySelector('.volume-icon');
const volumeLine = document.querySelector('.volume-line')

nameAudio.textContent = playList[0].title;
timeAudioDuration.textContent = playList[0].duration;

//флаг для проверки (включена музыка true, выключена - false);
let isPlay = false;
let playNum = 0;

function buttonPlayPauseAudio() {
  if(!isPlay) {
    playAudio(playNum);
  } else {
    pauseAudio(playNum);
  }
}
function unactivePlay() {
  document.querySelectorAll('.play-item').forEach(elemLi => {
    let btn = elemLi.lastElementChild
    if(btn.classList.contains('pause')) {
      btn.classList.remove('pause');
    }
  })
}

// список песен, наполняем из playList
playList.forEach( (elem, idx) => {
    const li = document.createElement('li');
    li.textContent = elem.title;
    li.classList = 'play-item';
    playListContainer.append(li);

    const buttonPlayPause = document.createElement('button');
    buttonPlayPause.classList = 'play';
    buttonPlayPause.classList.add('player-icon');
    buttonPlayPause.style.backgroundSize = '20px';
    buttonPlayPause.style.width = '20px';
    buttonPlayPause.style.height = '20px';
    buttonPlayPause.style.backgroundRepeat = 'no-repeat';
    buttonPlayPause.style.position = 'absolute';
    buttonPlayPause.style.top = '3px';
    buttonPlayPause.style.left = '0px';
    li.prepend(buttonPlayPause);

    buttonPlayPause.addEventListener('click', (event) => {
      let btnPlayPause = event.target;
      if(btnPlayPause.classList.contains('pause')) {
        pauseAudio();
        btnPlayPause.classList.remove('pause')
      } else {
        unactivePlay()
        playNum = idx;
        playAudio(playNum);
        btnPlayPause.classList.add('pause')
      }
    })
})

function playPrev() {
  playNum--;
  if(playNum < 0) {
    playNum = playList.length - 1;
  }
  activeAudio(playList[playNum].title)
  playAudio(playNum);
}

function playNext() {
  playNum++;
  if(playNum == playList.length) {
    playNum = 0;
  }
  activeAudio(playList[playNum].title)
  playAudio(playNum);
  
}
buttonPrev.addEventListener('click', playPrev)
buttonNext.addEventListener('click', playNext)

//Нажатие на кнопку Play/Pause
function activeButtonPlay() {
  buttonPlay.classList.add('pause')
  isPlay = true;
}

function activeButtonPause() {
  buttonPlay.classList.remove('pause')
  isPlay = false;
}

// запускает проигрывание плеера
function playAudio(playNum = 0) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    activeButtonPlay()
    nameAudio.textContent = playList[playNum].title
    timeAudioDuration.textContent = playList[playNum].duration
    activeAudio(playList[playNum].title)
}

// останавливает проигрывание плеера
function pauseAudio()  {
  audio.pause();
  activeButtonPause();
  activeAudio()
}

//воспроизведение аудио по кругу
//Событие ended происходит, когда аудио/видео достиг конца.
audio.onended = () => {
  playNext();
}

function activeAudio(titleAudio) {
  let item = document.querySelectorAll('.play-item')
  item.forEach( elem => {
    elem.classList.remove('item-active')
    elem.lastElementChild.classList.remove('pause')
    if(elem.innerText === titleAudio) {
      elem.classList.add('item-active');
      elem.lastElementChild.classList.add('pause');
    }
  })
}

//нажатие на кнопку включаем и останавливаем музыку
buttonPlay.addEventListener('click', buttonPlayPauseAudio);

//timeline-progress
function updateProgress(event) {
  const {duration, currentTime} = event.srcElement;
  const progressPersent = (currentTime / duration) * 100;
  timelineProgress.style.width = `${progressPersent}%`;
  const curentMinut = String(Math.floor(currentTime/60)).padStart(2, 0);
  const curentSec = String(parseInt(currentTime) - Math.floor(parseInt(currentTime)/60) * 60).padStart(2, 0);
  timeAudioCurrent.textContent = `${curentMinut}:${curentSec}`;
}

audio.addEventListener('timeupdate', updateProgress);

volumeLine.value = "30";

//Set progress timeline
function setProgress(event) {
  //общая ширина timeline
  const width = this.clientWidth;
  const clickTimelineX = event.offsetX;
  //полное время музыки
  const duration = audio.duration;
  audio.currentTime = (clickTimelineX / width) * duration
  console.log(duration)
}
timeline.addEventListener('click', setProgress)

//mute audio
//volumeLine.value отвечает за ползунок-кружок
let lastVolumeValue = '50';

//----------------------------------------------------------------

// function muteVolume() {
//   volumeIcon.classList.toggle('mute')
//   if(volumeIcon.classList.contains('mute')) {
//     audio.volume = '0.0';
//     volumeLine.value = '0';
//     volumeLine.style.backgroundSize = `${volumeLine.value}% 100%`;
//   } else {
//     audio.volume = '0.3';
//     volumeLine.value = '30';
//     volumeLine.style.backgroundSize = `${volumeLine.value}% 100%`;
//   }
// }
// volumeIcon.addEventListener('click', muteVolume)

// function setVolume(event) {
//   const width = this.clientWidth;
//   const clickVolumelineX = event.offsetX;
//   const currentPointVolume = (clickVolumelineX / width) * 100;
//   audio.volume = `${Math.floor(currentPointVolume/100*10)/10}`;
//   console.log(audio.volume)
//   volumeLine.value = `${Math.floor(currentPointVolume)}`;
//   volumeLine.style.backgroundSize = `${volumeLine.value}% 100%`;
// }
// volumeLine.addEventListener('click', setVolume)

//----------------------------------------------------------------

volumeIcon.addEventListener('click', function (e) {
  volumeIcon.classList.toggle('mute')

  if(volumeIcon.classList.contains('mute')) {
    lastVolumeValue = volumeLine.value;
    audio.volume = '0.0';
    volumeLine.value = '0';
    volumeLine.style.backgroundSize = `${volumeLine.value}% 100%`;
  } else {
    audio.volume = lastVolumeValue / 100;
    volumeLine.value = lastVolumeValue;
    volumeLine.style.backgroundSize = `${volumeLine.value}% 100%`;
  }

});

volumeLine.addEventListener('input', function(e) {
  if (volumeLine.value === '0') {
     volumeIcon.classList.add('mute');
  } else {
     volumeIcon.classList.remove('mute');
  }

  audio.volume = volumeLine.value / 100;
  
  const val = e.target.value;
  e.target.style.backgroundSize = val + '% 100%'
})




export {playAudio, pauseAudio, playPrev, playNext, activeAudio}

