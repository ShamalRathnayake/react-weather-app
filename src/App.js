import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SimpleWeather from './components/SimpleWeather'
import AdvancedWeather from './components/AdvancedWeather'
import { Link } from 'react-router-dom'
import './App.css'
const dotenv = require('dotenv').config()

function App () {
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {

    /* 
    getLocation()
    function getLocation () {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        alert('Please allow Location Access')
      }
    }

    function showPosition (position) {
      console.log(
        'Latitude: ' +
          position.coords.latitude +
          '    Longitude: ' +
          position.coords.longitude
      )
      
      if (position.coords.latitude && position.coords.longitude) {
    
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api_key}`
        )
          .then(res => res.json())
          .then(result => {
            setWeather(result)
            setQuery('')
            console.log(result)
          })
      }
    } */

    /* Not Working On Mobile But Works on PC*/
    

    if (window.location.pathname === '/') {
      setSimpleToggle(true)
    } else {
      setSimpleToggle(false)
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Colombo,LK&units=metric&APPID=${api_key}`
    )
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')  
        
      })
  }, [])

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [simpleToggle, setSimpleToggle] = useState()





  const search = e => {
    if (e.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api_key}`
      )
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const weatherType = () => {
    if (weather.weather[0].id.toString().startsWith('2')) {
      return 'Thunderstorm'
    } else if (weather.weather[0].id.toString().startsWith('3')) {
      return 'Drizzle'
    } else if (weather.weather[0].id.toString().startsWith('5')) {
      return 'Rain'
    } else if (weather.weather[0].id.toString().startsWith('6')) {
      return 'Snow'
    } else if (weather.weather[0].id.toString().startsWith('7')) {
      return 'Mist'
    } else if (
      weather.weather[0].id.toString().startsWith('8') &&
      weather.weather[0].id !== 800
    ) {
      return 'Clouds'
    } else if (weather.weather[0].toString().id === 800) {
      return 'Clear'
    } else {
      return 'App'
    }
  }

  

  return (
    <div className={typeof weather.main != 'undefined' ? ("App " +weatherType()) : 'App'}>
      {/* <div className="back-wrapper">
      <div className="effect-container">
        <div className={typeof weather.main != 'undefined' ? weatherType().toLowerCase() : ''}></div>
      </div>
      </div> 
      <div className="front-wrapper">*/}
      <Router>
        <div className='top-box'>
         
          <Search query={query} setQuery={setQuery} search={search} />
          <div className='links'>
            <Link
              className={
                simpleToggle === true
                  ? 'simpleLink toggled'
                  : 'simpleLink noSelect'
              }
              to='/'
              onClick={e => {
                setSimpleToggle(true)
              }}
            >
              Simple
            </Link>
            <Link
              className={
                simpleToggle === false
                  ? 'advancedLink toggled'
                  : 'advancedLink noSelect'
              }
              to='/advanced'
              onClick={e => {
                setSimpleToggle(false)
              }}
            >
              Advanced
            </Link>
          </div>
        </div>
        {typeof weather.main != 'undefined' ? (
          weather.cod === 200 ? (
            <React.Fragment>
              <Route
                exact
                path='/'
                render={props => <SimpleWeather weather={weather} />}
              />
              <Route
                path='/advanced'
                render={props => <AdvancedWeather weather={weather}/>}
              />
            </React.Fragment>
          ) : (
            ''
          )
        ) : (
          <div className='location-box'>
            <div className='location'>
              <div>City not Available</div>
            </div>
          </div>
        )}
      </Router>
    </div>
    /* </div> */
  )
}

export default App
