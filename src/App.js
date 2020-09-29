import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Axios from "axios";
import { useState } from "react";
import WeatherWidget from "./components/WeatherWidget";
import CityWidget from "./components/CityWidget";
import { CircularProgress } from "@material-ui/core";
const dotenv = require("dotenv").config();
const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [weather, setweather] = useState({});
  const [visible, setvisible] = useState(false);

  const setPosition = (lat, long) => {
    setlat(lat);
    setlong(long);
  };

  const getWeather = () => {
    if (lat === "" || long === "") {
      async function fetchData() {
        let result = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Colombo,LK&units=metric&APPID=${api_key}`
        );
        setweather(result);
      }

      fetchData();
    } else {
      async function fetchData() {
        let result = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lat}&units=metric&APPID=${api_key}`
        );
        setweather(result);
      }

      fetchData();
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
    getWeather();
  }, []);

  const searchWeather = (city) => {
    setweather({});
    async function fetchData() {
      let result = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api_key}`
      );
      setweather(result);
    }

    fetchData();
  };

/*   let cities = cityList.filter((city) => {
    if (
      city.country === "LK" ||
      city.country === "CH" ||
      city.country === "CA" ||
      city.country === "JP" ||
      city.country === "AU" ||
      city.country === "UK" ||
      city.country === "US" ||
      city.country === "IN" ||
      city.country === "CN" ||
      city.country === "RU" ||
      city.country === "KR"
    ) {
      return city;
    }
  }); */
  return (
    <div className="App">
      <div
        className={`main-card ${
          typeof weather.data !== "undefined"
            ? weather.data.weather[0].main === "Rain"
              ? "rain"
              : weather.data.weather[0].main === "Clouds"
              ? "cloudy"
              : weather.data.weather[0].main === "Clear"
              ? "clear"
              : ""
            : ""
        }`}
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} sm={8} className="weather-display">
            {typeof weather.data !== "undefined" ? (
              <WeatherWidget weather={weather} setvisible={setvisible} />
            ) : (
              <div className="loader">
                <CircularProgress color="secondary" />
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className={
              visible === true
                ? "city-display city-display-mobile"
                : "city-display"
            }
          >
            <CityWidget searchWeather={searchWeather} setvisible={setvisible} />
          </Grid>
        </Grid>
      </div>

    {/*   {cities.map((city) => (
        <p>
          {'{ "name" : ' +
            '"' +
            city.name +
            '"' +
            ', "country" : ' +
            '"' +
            city.country +
            '"' +
            "},"}
        </p>
      ))} */}
    </div>
  );
}

export default App;
