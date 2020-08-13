import React from 'react'
import WorldTime from './WorldTime'

function simpleWeather (props) {
  return (
    <React.Fragment>
      <div className='photobg-box'>
        <div>
          <div className='location-box'>
            <div className='location'>
              {props.weather.name}, {props.weather.sys.country}
            </div>
          </div>
          <div className='weatherimg-box'>
            <img
              src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
              alt=''
              className='weather-icon'
            />
          </div>
        </div>
      </div>

      <div className='wavy-thing'>
        {/* This code was copied from codepen */}
        {/* link : https://codepen.io/cmdw/pen/vQqzyB */}

        <svg
          className='editorial'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 24 150 28 '
          preserveAspectRatio='none'
        >
          <defs>
            <path
              id='gentle-wave'
              d='M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z'
            />
          </defs>
          <g className='parallax1'>
            <use
              xlinkHref='#gentle-wave'
              x='50'
              y='3'
              fill='rgba(255, 255, 255, 0.5)'
            />
          </g>
          <g className='parallax2'>
            <use
              xlinkHref='#gentle-wave'
              x='50'
              y='0'
              fill='rgba(255, 255, 255, 0.5)'
            />
          </g>
          <g className='parallax3'>
            <use
              xlinkHref='#gentle-wave'
              x='50'
              y='9'
              fill='rgba(255, 255, 255, 0.5)'
            />
          </g>
          <g className='parallax4'>
            <use
              xlinkHref='#gentle-wave'
              x='50'
              y='6'
              fill='rgba(255, 255, 255, 0.5)'
            />
          </g>
        </svg>

        {/* End of copied code */}
      </div>

      <div className='weather-container'>
        <div className='weather-wrapper'>
          <div className='weather-box'>
            <div className='temp'>{Math.round(props.weather.main.temp)} °C</div>
            <div className='weather'>{props.weather.weather[0].main}</div>
            <p className='weatherdesc'>
              {props.weather.weather[0].description}
            </p>
            <WorldTime weather={props.weather} />
          </div>
          
          <br />
        </div>
      </div>
    </React.Fragment>
  )
}

export default simpleWeather
