import React, { lazy, Suspense, useState } from 'react';
import './App.css';
import Loading from './components/loading/Loading';
import getWeather from './apiService/apiService';

const MapView = lazy(() => import('./components/map/Map.view'))


function App() {

  const [weather, setWeather] = useState({})

  const fetchWeatherData = async (lat, lon) => {
    await setWeather({})
    const weatherData = await getWeather(lat, lon)
    setWeather(weatherData)
  }


  return (
    <div className="App">
      <div className="background">
        <Suspense fallback={<Loading />}>
          <MapView weather={weather} fetchWeatherData={fetchWeatherData} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
