import { useEffect, useState } from "react";

import weatherService from "../services/weather";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("Weather effect");
    weatherService
      .getCityWeather(city)
      .then((response) => setWeather(response))
      .catch((error) => console.log("Effect error: ", error));
  }, [city]);

  if (weather === null) return null;

  return (
    <>
      <h2>Weather in {city}</h2>
      <div>Temperature: {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`The weather in ${city} is ${weather.weather[0].description}`}
      ></img>
      <div>Wind: {weather.wind.speed} m/s</div>
    </>
  );
};

export default Weather;
