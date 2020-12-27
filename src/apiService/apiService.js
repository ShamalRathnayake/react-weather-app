import axios from "axios";

require('dotenv').config();

const apiKey = process.env.REACT_APP_WEATHER_KEY;

const getWeather = async (lat, lon) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    console.log(weather.data)
    return weather.data;
}

export default getWeather;