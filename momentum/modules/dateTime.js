const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingText = document.querySelector('.greeting');
const name = document.querySelector('.name')

const showTime = () => {
    const dateObj = new Date();
    const currentTime = dateObj.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
}

const showDate = () => {
    const dateObj = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    const currentDate = dateObj.toLocaleDateString('en-US', options);
    date.textContent = currentDate
}
// morning, afternoon, evening, night
const setTimeOfDay = () => {
    greetingText.textContent = `Good ${getTimeOfDay()},`;
}


const getTimeOfDay = () => {
    const dateObj = new Date();
    const hours = dateObj.getHours();
    if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
        return 'evening';
    } else if (hours >= 0 && hours < 6) {
        return 'night';
    } 
}

// Записываем данные:
// Для записи используйте метод  setItem('key', 'value') - key, по которому будет сохранено value, и само value.

const setLocalStorage = () => {
    localStorage.setItem('name', name.value);
}

// При чтении ранее записанных данных по ключу name мы получим значение name.value:
// За чтение отвечает getItem('ключ') c одним параметром, который указывает на ключ для чтения и возвращает полученное значение из хранилища. Если по этому ключу нет значения, то метод вернёт null.
const getLocalStorage = () => {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }


export {showTime, setTimeOfDay, getTimeOfDay, setLocalStorage, getLocalStorage}