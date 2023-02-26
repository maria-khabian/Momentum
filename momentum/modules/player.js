import playList from './playList.js';

const audio = new Audio();

const buttonPlay = document.querySelector('.play');
const buttonPrev = document.querySelector('.play-prev');
const buttonNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

//флаг для проверки (включена музыка true, выключена - false);
let isPlay = false;
let playNum = 0;

// список песен, наполняем из playList
playList.forEach( elem => {
    const li = document.createElement('li');
    li.textContent = elem.title;
    li.classList = 'play-item';
    playListContainer.append(li);
})

const playPrev = () => {
  playNum--;
  if(playNum < 0) {
    playNum = playList.length - 1;
  }
  activeAudio(playList[playNum].title)
  playAudio(playNum);
}

const playNext = () => {
  playNum++;
  if(playNum == playList.length) {
    playNum = 0;
  }
  activeAudio(playList[playNum].title)
  playAudio(playNum);
  
}
buttonPrev.addEventListener('click', playPrev)
buttonNext.addEventListener('click', playNext)

// запускает проигрывание плеера
const playAudio = (playNum = 0) => {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    buttonPlay.classList.add('pause')
    isPlay = true;
}
// останавливает проигрывание плеера
const pauseAudio = () => {
  audio.pause();
  buttonPlay.classList.remove('pause')
  isPlay = false;
}

const activeAudio = (titleAudio) => {
  let item = document.querySelectorAll('.play-item')
  item.forEach( elem => {
    elem.classList.remove('item-active')
    if(elem.innerText === titleAudio) {
      elem.classList.add('item-active')
    }
  })
}



//нажатие на кнопку включаем и останавливаем музыку
buttonPlay.addEventListener('click', () => {
  if(!isPlay) {
    playAudio();
  } else {
    pauseAudio();
  }
});

export {playAudio, pauseAudio, playPrev, playNext, activeAudio}

