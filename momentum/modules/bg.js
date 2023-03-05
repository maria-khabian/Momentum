import {getRandomNum} from './help.js';
import {getTimeOfDay} from './dateTime.js';

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const body = document.querySelector('.body');
let randomNum = getRandomNum(1, 21);

// timeOfDay = getTimeOfDay(), bgNum = randomNum.toString()
async function setBg (bgNum = randomNum) {
    const timeOfDay = getTimeOfDay();
    const bgRundNum = bgNum.toString().padStart(2, '0');
    // создаем объект изображения
    const img = new Image();
    // предварительно загрузить файл изображения 
    img.src = `https://raw.githubusercontent.com/maria-khabian/img-momentum/assets/images/${timeOfDay}/${bgRundNum}.jpg`;
    // установить, что произойдет после загрузки изображения
    img.onload = () => {      
        body.style.backgroundImage = `url('${img.src}')`
    };    
}

body.style.backgroundImage = `url(${setBg()})`;

async function getSlideNext () {
    if(randomNum < 20) {
        randomNum += 1
    } else {
        randomNum = 1
    }
    setBg(randomNum)
}

async function getSlidePrev() {
    if(randomNum > 1) {
        randomNum -= 1
    } else {
        randomNum = 20
    }
    setBg(randomNum)  
}

// toggle the background on the prev and next buttons
slidePrev.addEventListener('click', () => body.style.backgroundImage = `url(${getSlidePrev()})`);
slideNext.addEventListener('click', () => body.style.backgroundImage = `url(${getSlideNext()})`);

// slidePrev.addEventListener('click', getSlidePrev)
// slideNext.addEventListener('click', getSlideNext)

export {setBg, getSlidePrev, getSlideNext}