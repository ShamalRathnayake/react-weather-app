import React, { lazy, Suspense, useState } from 'react';
import './App.css';
import Loading from './components/loading/Loading';
import BottomDrawer from './components/bottomDrawer/BottomDrawer';
import getWeather from './apiService/apiService';

require('dotenv').config();



const Map = lazy(() => import('./components/map/Map'))



const style = {
  App: {
    maxHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden"
  },

  bg: {
    backgroundColor: "#101010",
    height: "100vh",
    width: "100vw",
    position: "relative"
  }
};



function App() {

  const [openDrawer, setOpenDrawer] = useState(false)
  const [weather, setWeather] = useState({})


  const fetchWeatherData = async (lat, lon) => {
    const weatherData = await getWeather(lat, lon)
    setWeather(weatherData)
  }


  return (
    <div className="App" style={style.App}>

      <div style={style.bg}>
        <Suspense fallback={<Loading />}>
          <Map setOpenDrawer={setOpenDrawer} fetchWeatherData={fetchWeatherData} />
        </Suspense>
      </div>
      <BottomDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} weather={weather} />

    </div>
  );
}

export default App;
