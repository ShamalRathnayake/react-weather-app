import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { faTint } from '@fortawesome/free-solid-svg-icons'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'

function advancedWeather (props) {
  let lat = props.weather.coord.lat.toFixed(9)
  let lon = props.weather.coord.lon.toFixed(9)
  let sunrise = new Date(0)
  sunrise.setUTCSeconds(props.weather.sys.sunrise)
  let sunset = new Date(0)
  sunset.setUTCSeconds(props.weather.sys.sunset)
  

console.log('dfgdgfgg');
  

  
  return (
    <div>
      <React.Fragment>
        <Router>
          <div className='advanced-photobg-box'>
            <div>
              <div className='location-box'>
                <div className='location'>
                  {props.weather.name}, {props.weather.sys.country}
                </div>
              </div>
              <ul className='icon-set'>
                <li>
                  <Link to='/advanced'>
                    <FontAwesomeIcon icon={faGlobeAmericas} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/cloud'>
                    <FontAwesomeIcon icon={faCloud} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/temperature'>
                    <FontAwesomeIcon icon={faTemperatureHigh} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/humidity'>
                    <FontAwesomeIcon icon={faTint} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/pressure'>
                    <FontAwesomeIcon icon={faTachometerAlt} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/weather'>
                    <FontAwesomeIcon icon={faCloudSunRain} size='2x' />
                  </Link>
                </li>
                <li>
                  <Link to='/advanced/wind'>
                    <FontAwesomeIcon icon={faWind} size='2x' />
                  </Link>
                </li>
              </ul>
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
                <Route
                  exact
                  path='/advanced'
                  render={() => (
                    <React.Fragment>
                        
                      <ul className='detail-box'>
                        <li>Country : <span className='weather-data'>{props.weather.sys.country}</span></li>
                      
                        <li>City :<span className='weather-data'> {props.weather.name}</span></li>
                      
                        <li>Lattitude : <span className='weather-data'>{lat}</span></li>
                      
                        <li>Longitude : <span className='weather-data'>{lon}</span></li>
                      
                        <li>Sunrise : <span className='weather-data'>{sunrise.toString()}</span></li>
                      
                        <li>Sunset : <span className='weather-data'>{sunset.toString()}</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />

                <Route
                  path='/advanced/cloud'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>Cloud Coverage : <span className='weather-data'>{props.weather.clouds.all} %</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />
                <Route
                  path='/advanced/temperature'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>Temperature : <span className='weather-data'>{props.weather.main.temp} °C</span></li>
                      
                        <li>
                          Max Temperature : <span className='weather-data'>{props.weather.main.temp_max} °C</span>
                        </li>
                      
                        <li>
                          Min Temperature : <span className='weather-data'>{props.weather.main.temp_min} °C</span>
                        </li>
                     
                        <li>Feels Like : <span className='weather-data'>{props.weather.main.feels_like} °C</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />
                <Route
                  path='/advanced/humidity'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>Humidity : <span className='weather-data'>{props.weather.main.humidity} %</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />
                <Route
                  path='/advanced/pressure'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>Pressure : <span className='weather-data'>{props.weather.main.pressure} hPa</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />

                <Route
                  path='/advanced/weather'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>
                          Weather Condition : <span className='weather-data'>{props.weather.weather[0].main}</span>
                        </li>
                      
                        <li>
                          Weather Description :<span className='weather-data'>
                          {props.weather.weather[0].description}</span>
                        </li>
                      </ul>
                    </React.Fragment>
                  )}
                />
                <Route
                  path='/advanced/wind'
                  component={() => (
                    <React.Fragment>
                      <ul className='detail-box'>
                        <li>Wind Speed : <span className='weather-data'>{props.weather.wind.speed} m/s</span></li>
                      
                        <li>Wind Direction : <span className='weather-data'>{props.weather.wind.deg} deg</span></li>
                      </ul>
                    </React.Fragment>
                  )}
                />
              </div>
              <br />
            </div>
          </div>
        </Router>
      </React.Fragment>
    </div>
  )
}

export default advancedWeather
