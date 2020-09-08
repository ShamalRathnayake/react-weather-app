import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Search from "./components/Search";
import Axios from "axios";
import { useState } from "react";
import Loader from "./components/Loader";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ToysIcon from "@material-ui/icons/Toys";

const dotenv = require("dotenv").config();
const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [weather, setweather] = useState({});
  const [keyword, setkeyword] = useState("");

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

  const search = (e) => {
    if (e.key === "Enter") {
      if (keyword !== "" || keyword !== null) {
        async function fetchData() {
          let result = await Axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=metric&APPID=${api_key}`
          );
          setweather(result);
          setkeyword("");
        }

        fetchData();
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
    getWeather();
  }, []);

  return (
    <div className="App">
      {typeof weather.data !== "undefined" ? (
        <>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Search
                keyword={keyword}
                setkeyword={setkeyword}
                search={search}
              />
            </Grid>
            <Grid item xs={12}>
              <p className="App__country__name">
                {weather.data.name} , {weather.data.sys.country}
              </p>
            </Grid>
            <Grid item xs={12}>
              <div className="App__weather__box">
                <p className="App__weather__mainTemp">
                  {weather.data.main.temp} °C
                </p>
                <p className="App_weather__mainWeather">
                  {weather.data.weather[0].main}
                </p>
                <p className="App_weather__subWeather">
                  {weather.data.weather[0].description}
                </p>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-evenly"
            alignItems="center"
            className="App__detail"
          >
            <Grid item xs={5} className="App__detail__box">
              <WbSunnyIcon color="inherit" />
              <p>Min : {weather.data.main.temp_min} °C</p>
              <p>Max : {weather.data.main.temp_max} °C</p>
              <p>Feels : {weather.data.main.feels_like} °C</p>
              <p>Humidity : {weather.data.main.humidity} %</p>
            </Grid>
            <Grid item xs={5} className="App__detail__box">
              <ToysIcon color="inherit" />
              <p>Speed : {weather.data.wind.speed} m/s</p>
              <p>Direction : {weather.data.wind.deg}° </p>
              <p>Pressure : {weather.data.main.pressure} hPa</p>
              <p>Clouds : {weather.data.clouds.all} %</p>
            </Grid>
          </Grid>

          {console.log(weather)}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
