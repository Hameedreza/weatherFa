// import 'regenerator-runtime/runtime'


const searchInput = document.querySelector('.weather__search');
const cityName = document.querySelector('.weather__city');
const day = document.querySelector('.weather__day');
const humidity = document.querySelector('.weather__indicators--humidity>.value');
const wind = document.querySelector('.weather__indicators--wind>.value');
const pressure = document.querySelector('.weather__indicators--pressure>.value');
const image = document.querySelector('.weather__image');
const temprature = document.querySelector('.weather__temp>.value');
const forecastBock = document.querySelector('.weahter__forecast');
const forecastIcon = document.querySelector('.weather__forecast__icon');
const forecastDay = document.querySelector('.weather__forecast__day');
const forecasttemp = document.querySelector('.weather__forecast__temprature');
const suggestions = document.querySelector('.suggestion');
const hamburger = document.querySelector('.hamburger');
const line1 = document.querySelector('.line-1');
const line2 = document.querySelector('.line-2');
const line3 = document.querySelector('.line-3');
const menu = document.querySelector('.menu');
const weather= document.querySelector('.weather');

let APIKey = 'f999dc164b9448e80899d77c2d3c6a56';
let endpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + APIKey;
let forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + APIKey;
let cityBaseEndpoint = 'https://api.teleport.org/api/cities/?search=';

let englishAl = [
  { alph: 'a' },
  { alph: 'b' },
  { alph: 'c' },
  { alph: 'd' },
  { alph: 'e' },
  { alph: 'f' },
  { alph: 'g' },
  { alph: 'h' },
  { alph: 'i' },
  { alph: 'j' },
  { alph: 'k' },
  { alph: 'l' },
  { alph: 'm' },
  { alph: 'n' },
  { alph: 'o' },
  { alph: 'p' },
  { alph: 'q' },
  { alph: 'r' },
  { alph: 's' },
  { alph: 't' },
  { alph: 'u' },
  { alph: 'v' },
  { alph: 'w' },
  { alph: 'x' },
  { alph: 'y' },
  { alph: 'z' }
];

let images = [
  {
    url: '../images/lightning2.png',
    id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
  },
  {
    url: '../images/rain2.png',
    id: [500, 501, 502, 503, 504]
  },
  {
    url: '../images/shower-rain2.png',
    id: [520, 521, 522, 531]
  },
  {
    url: '../images/mist2.png',
    id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
  },
  {
    url: '../images/sunny2.png',
    id: [800]
  },
  {
    url: '../images/snowy2.png',
    id: [600, 601, 602, 611, 612, 613, 614, 615, 616, 620, 621, 622]
  },
  {
    url: '../images/partly-cloudy2.png',
    id: [801]
  },
  {
    url: '../images/scatter-clouds2.png',
    id: [802]
  },
  {
    url: '../images/broken-clouds2.png',
    id: [803, 804]
  }
]

hamburger.addEventListener('click' , (event)=>{
  hamburger.classList.toggle('rotate');
  line1.classList.toggle('color');
  line2.classList.toggle('color');
  line3.classList.toggle('color');
  menu.classList.toggle('menu-up');
})




let getWeatherByCityName = async (name) => {
  let baseEndpoint = endpoint + '&q=' + name;
  let responce = await fetch(baseEndpoint);
  if (responce.status !== 200) {
    alert('city not found');
    return;
  }
  let results = await responce.json();
  // fetch('../../cities.json').then(responce =>{
  //   responce.json().then(data =>{
  //     for (let city of data){
  //       if(city.name === name){
  //         cityName.textContent = city.name;
  //         break;
  //       }
  //       else{
  //         cityName.textContent = results.name;
  //       }
  //     }
  //   })
  // })
  let request = new XMLHttpRequest();
  request.open('GET', '../cities.josn');
  request.onload = function () {
    const details = request.response;
    const cities = JSON.parse(details);
    for (let city of cities) {
      if (city.name === name) {
        cityName.textContent = city.name;
        break;
      } else {
        cityName.textContent = results.name;
      }
    };
  }
  request.send();
  cityName.textContent = results.name;
  return results;
}

let getForecastbyCityId = async (id) => {
  let baseEndpoint = forecastEndpoint + '&id=' + id;
  let results = await fetch(baseEndpoint);
  let forecast = await results.json();
  let forecastList = forecast.list;
  let daily = [];
  forecastList.forEach(day => {
    let date = new Date(day.dt_txt);
    let hour = date.getHours();
    if (hour === 12) {
      daily.push(day);
    }
  })
  return daily;
}


let updateCurrentWeather = async (city) => {
  day.textContent = dayOfWeek();
  humidity.textContent = city.main.humidity;
  pressure.textContent = city.main.pressure;
  let deriection;
  let deg = city.wind.deg;
  if (deg > 45 && deg <= 135) {
    deriection = 'شرق';
  } else if (deg > 135 && deg <= 225) {
    deriection = 'جنوب';
  } else if (deg > 225 && deg <= 315) {
    deriection = 'غرب';
  } else if (deg > 315 && deg <= 45) {
    deriection = 'شمال';
  }
  wind.textContent = deriection + ' _ ' + city.wind.speed.toFixed(0);
  temprature.textContent = (Math.floor(city.main.temp)) > 0 ? '+' + (Math.floor(city.main.temp)) : (Math.floor(city.main.temp));
  let weather = city.weather[0].id;
  images.forEach(obj => {
    if (obj.id.includes(weather)) {
      image.setAttribute('src', obj.url);
    }
  })
}

let updateForecast = async (forecast) => {
  forecastBock.innerHTML = '';
  forecast.forEach(day => {
    let iconURL = 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';

    let weekday = dayOfWeek(day.dt * 1000)
    let temp = (Math.floor(day.main.temp)) > 0 ? '+' + (Math.floor(day.main.temp)) : (Math.floor(day.main.temp));
    let forecastItem = `
    <article class="weather__forecast__item">
      <img src=${iconURL} alt="" class="weather__forecast__icon">
      <h3 class="weather__forecast__day">${weekday}</h3>
      <p dir="ltr" class="weather__forecast__temprature"><span class="value">${temp}</span>&deg;c</p>
    </article>`;
    forecastBock.insertAdjacentHTML('afterbegin', forecastItem);
  })
}

let dayOfWeek = (dt = new Date().getTime()) => {
  return new Date(dt).toLocaleDateString('fa-IR', { 'weekday': 'long' });
}


let weatherForCity = async (city) => {
  let weather = await getWeatherByCityName(city);
  if (!weather) return;
  updateCurrentWeather(weather);
  let cityId = weather.id;
  let dailyInfo = await getForecastbyCityId(cityId);
  updateForecast(dailyInfo);
}

let init = () => {
  weatherForCity('تهران').then(() => document.body.style.filter = 'blur(0)');
}

init();

searchInput.addEventListener('keydown', async (e) => {
  englishAl.forEach(alph => {
    if (alph.alph === e.key) {
      searchInput.style.textAlign = 'left';
      searchInput.getAttribute('dir', 'ltr');
      searchInput.setAttribute('placeholder', "city's name");
      searchInput.style.color = '#3b6a7e';
    }
  })
  if (e.keyCode === 13) {
    weatherForCity(searchInput.value);
  }
})

searchInput.addEventListener('input', async (e) => {
  let endpoint = cityBaseEndpoint + searchInput.value;
  let results = await (await fetch(endpoint)).json();
  // console.log(results);
  let cities = results._embedded['city:search-results'];
  suggestions.innerHTML = '';
  console.log(cities);
  let length = (cities.length > 8) ? 8 : cities.length;
  for (let i = 0; i <= length; i++) {
    let option = document.createElement('option');
    option.value = cities[i].matching_alternate_names[0].name;
    suggestions.appendChild(option);
  }
})
