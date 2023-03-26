import axios from "axios";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getCityWeather = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return request.then((response) => response.data);
};

const weatherService = {
  getCityWeather,
};

export default weatherService;
