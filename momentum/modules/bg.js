import {getRandomNum} from './help.js';
import {getTimeOfDay} from './dateTime.js';


const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const body = document.querySelector('.body');
let randomNum = getRandomNum(1, 21);

function getImage(url){
    // создаем объект изображения
    const img = new Image();
    // предварительно загрузить файл изображения 
    img.src = url;
    // установить, что произойдет после загрузки изображения
    img.onload = () => {      
        body.style.backgroundImage = url
    };
}

const setBg = (timeOfDay = getTimeOfDay(), bgNum = randomNum + '') => {
    timeOfDay = getTimeOfDay();
    bgNum = randomNum + '';
    getImage(`https://raw.githubusercontent.com/maria-khabian/img-momentum/assets/images/${timeOfDay}/${bgNum.padStart(2, '0')}.jpg`)
    
    return `https://raw.githubusercontent.com/maria-khabian/img-momentum/assets/images/${timeOfDay}/${bgNum.padStart(2, '0')}.jpg`
}

body.style.backgroundImage = `url(${setBg(undefined, String(randomNum))})`;

const getSlidePrev = () => {
    if(randomNum < 20) {
        randomNum += 1
    } else {
        randomNum = 1
    }
    return setBg( undefined, String(randomNum))
}

const getSlideNext = () => {
    if(randomNum > 1) {
        randomNum -= 1
    } else {
        randomNum = 20
    }
    return setBg( undefined, String(randomNum))
    
}

// toggle the background on the prev and next buttons
slidePrev.addEventListener('click', () => body.style.backgroundImage = `url(${getSlidePrev()})`);
slideNext.addEventListener('click', () => body.style.backgroundImage = `url(${getSlideNext()})`);

// slidePrev.addEventListener('click', getSlidePrev)
// slideNext.addEventListener('click', getSlideNext)

export {setBg, getSlidePrev, getSlideNext}