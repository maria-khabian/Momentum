const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const relativeHumidity = document.querySelector('.relative-humidity');
const inputCity = document.querySelector('.city');

inputCity.addEventListener('change', () => {
    getWeather(inputCity.value)
})

// Записываем данные:
// Для записи используйте метод  setItem('key', 'value') - key, по которому будет сохранено value, и само value.

const setLocalStorage = () => {
    localStorage.setItem('city', inputCity.value);
}

// При чтении ранее записанных данных по ключу name мы получим значение name.value:
// За чтение отвечает getItem('ключ') c одним параметром, который указывает на ключ для чтения и возвращает полученное значение из хранилища. Если по этому ключу нет значения, то метод вернёт null.
const getLocalStorage = () => {
    if(localStorage.getItem('city')) {
        inputCity.value = localStorage.getItem('city');
        getWeather(inputCity.value)
    }
  }

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

async function getWeather (city = 'Минск') {

    inputCity.value = city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=8bd932aae140c2c39a3cd0056e7ff1b1&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    // console.log(Math.ceil(data.main.humidity))
    windSpeed.textContent = `${Math.ceil(data.wind.speed)} m/s`
    relativeHumidity.textContent = `${Math.ceil(data.main.humidity)} %`
    
}
export {getWeather}