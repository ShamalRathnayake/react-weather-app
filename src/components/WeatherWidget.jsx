import { Grid, IconButton } from "@material-ui/core";
import { MenuOutlined } from "@material-ui/icons";
import React from "react";
import "./weatherWidget.css";
import WorldTime from "./WorldTime";

function WeatherWidget({ weather, setvisible }) {
  console.log(weather);

  const getCountryName = (countryCode) => {
    if (countryCode === "LK") {
      return "Sri Lanka";
    } else if (countryCode === "CH") {
      return "Switzerland";
    } else if (countryCode === "CA") {
      return "Canada";
    } else if (countryCode === "JP") {
      return "Japan";
    } else if (countryCode === "AU") {
      return "Austrailia";
    } else if (countryCode === "UK") {
      return "United Kingdom";
    } else if (countryCode === "US") {
      return "United States";
    } else if (countryCode === "IN") {
      return "India";
    } else if (countryCode === "CN") {
      return "China";
    } else if (countryCode === "RU") {
      return "Russia";
    } else if (countryCode === "KR") {
      return "Korea";
    }
  };
  return (
    <div className="weather-widget-bg">
      <div className="app-name">Weathera</div>
      <IconButton className="menu-btn-wrap" onClick={(e) => setvisible(true)}>
        <MenuOutlined className="menu-btn" />
      </IconButton>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className="weather-grid"
      >
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <img
            src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
            alt="weather-icon"
            className="weather-icon"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <p className="temp">{weather.data.main.temp}° </p>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item sm={12}>
              <p className="location">
                {weather.data.name}, {getCountryName(weather.data.sys.country)}
              </p>
            </Grid>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item sm={12}>
                <p className="main-weather-desc">
                  {weather.data.weather[0].main}
                </p>
              </Grid>
              <Grid item sm={12}>
                {" "}
                <p className="sub-weather-desc">
                  {weather.data.weather[0].description}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid item sm={12}>
            <div className="date-time">
              <WorldTime weather={weather} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default WeatherWidget;
