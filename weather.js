const weatherEl = document.querySelector('.weather');
const API_KEY = '';
const COORDS = 'coords';

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then((response) => {
    return response.json();
  }).then((json) => {
    const temperature = json.main.temp;
    const place = json.name;
    weatherEl.innerText = `${temperature} @ ${place}`;
  });
}

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

const handleGeoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(coordsObj);
}

const handleGeoError = () => {
  console.log('tlfvo')
}

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

const loadCoords = () => {
  const loadedCords = localStorage.getItem(COORDS);
  if (!loadedCords) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

init = () => {
  loadCoords();
}

init();