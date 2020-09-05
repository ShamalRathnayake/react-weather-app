import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Search from "./components/Search";
import Axios from "axios";
import { useState } from "react";
import Loader from "./components/Loader";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const dotenv = require("dotenv").config();
const api_key = process.env.REACT_APP_API_KEY;

function App() {
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [weather, setweather] = useState({});
  const [keyword, setkeyword] = useState("");
  const [expand, setexpand] = useState(false);

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
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="App__Wrapper"
          >
            <Grid item xs={12} className="App__Top__Container">
              <Search
                keyword={keyword}
                setkeyword={setkeyword}
                search={search}
              />
              <div className="App__Top__Container__Location">
                {weather.data.name}, {weather.data.sys.country}
              </div>

              <img
                src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
                className="App__Top__Container__WeatherBox__Image"
              />

              <div className="App__Top__Container__Wave">
                {/* This code was copied from codepen */}
                {/* link : https://codepen.io/cmdw/pen/vQqzyB */}

                <svg
                  className="editorial"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 150 28 "
                  preserveAspectRatio="none"
                >
                  <defs>
                    <path
                      id="gentle-wave"
                      d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
                    />
                  </defs>
                  <g className="parallax1">
                    <use
                      xlinkHref="#gentle-wave"
                      x="50"
                      y="3"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                  <g className="parallax2">
                    <use
                      xlinkHref="#gentle-wave"
                      x="50"
                      y="0"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                  <g className="parallax3">
                    <use
                      xlinkHref="#gentle-wave"
                      x="50"
                      y="9"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                  <g className="parallax4">
                    <use
                      xlinkHref="#gentle-wave"
                      x="50"
                      y="6"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                </svg>

                {/* End of copied code */}
              </div>
            </Grid>
            <Grid item xs={12} className="App__Bottom__Container">
              {console.log(weather)}
              <div className="App__Bottom__Container__Box">
                <div className="App__Bottom__Container__Temp">
                  {Math.round(weather.data.main.temp)}°C
                </div>
                <div className="App__Bottom__Container__Weather">
                  {weather.data.weather[0].main}
                </div>
                <p className="App__Bottom__Container__WeatherDesc">
                  {weather.data.weather[0].description}
                </p>
              </div>
            </Grid>
          </Grid>
          <div
            className={
              expand ? "App__Detail__Page Expand" : "App__Detail__Page"
            }
            onClick={(e) => setexpand(!expand)}
          >
            {expand ? (
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <ul className="App__Detail__Page__Box">
                    <li>
                      Country :{" "}
                      <span className="weather-data">
                        {weather.data.sys.country}
                      </span>
                    </li>

                    <li>
                      City :
                      <span className="weather-data"> {weather.data.name}</span>
                    </li>

                    <li>
                      Lattitude :{" "}
                      <span className="weather-data">
                        {weather.data.coord.lat}
                      </span>
                    </li>

                    <li>
                      Longitude :{" "}
                      <span className="weather-data">
                        {weather.data.coord.lon}
                      </span>
                    </li>

                    <li>
                      Sunrise :{" "}
                      <span className="weather-data">
                        {weather.data.sys.sunrise.toString()}
                      </span>
                    </li>

                    <li>
                      Sunset :{" "}
                      <span className="weather-data">
                        {weather.data.sys.sunset.toString()}
                      </span>
                    </li>
                    <li>
                      Cloud Coverage :{" "}
                      <span className="weather-data">
                        {weather.data.clouds.all} %
                      </span>
                    </li>
                    <li>
                      Temperature :{" "}
                      <span className="weather-data">
                        {weather.data.main.temp} °C
                      </span>
                    </li>

                    <li>
                      Max Temperature :{" "}
                      <span className="weather-data">
                        {weather.data.main.temp_max} °C
                      </span>
                    </li>

                    <li>
                      Min Temperature :{" "}
                      <span className="weather-data">
                        {weather.data.main.temp_min} °C
                      </span>
                    </li>

                    <li>
                      Feels Like :{" "}
                      <span className="weather-data">
                        {weather.data.main.feels_like} °C
                      </span>
                    </li>
                    <li>
                      Humidity :{" "}
                      <span className="weather-data">
                        {weather.data.main.humidity} %
                      </span>
                    </li>
                    <li>
                      Pressure :{" "}
                      <span className="weather-data">
                        {weather.data.main.pressure} hPa
                      </span>
                    </li>
                    <li>
                      Weather Condition :{" "}
                      <span className="weather-data">
                        {weather.data.weather[0].main}
                      </span>
                    </li>

                    <li>
                      Weather Description :
                      <span className="weather-data">
                        {weather.data.weather[0].description}
                      </span>
                    </li>
                    <li>
                      Wind Speed :{" "}
                      <span className="weather-data">
                        {weather.data.wind.speed} m/s
                      </span>
                    </li>

                    <li>
                      Wind Direction :{" "}
                      <span className="weather-data">
                        {weather.data.wind.deg} deg
                      </span>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            ) : (
              <MoreHorizIcon />
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
