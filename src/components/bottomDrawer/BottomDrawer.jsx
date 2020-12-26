import { Card, Grid, IconButton } from '@material-ui/core';
import React from 'react'
import SlidingPane from "react-sliding-pane";
import "./bottomDrawer.css";
import CancelIcon from '@material-ui/icons/Cancel';
import logo from './logo.png'
import hotTemp from '../../assets/hot.svg'
import temp from '../../assets/celsius.svg'
import coldTemp from '../../assets/cold.svg'
import PublicIcon from '@material-ui/icons/Public';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import GradientIcon from '@material-ui/icons/Gradient';
import WavesIcon from '@material-ui/icons/Waves';
import CloudIcon from '@material-ui/icons/Cloud';

const BottomDrawer = ({ openDrawer, setOpenDrawer, weather }) => {

    return (
        <div>
            {weather.cod === 200 ? (
                <SlidingPane
                    isOpen={openDrawer}
                    title={
                        <div className="title-container">
                            <img src={logo} alt="logo" className="title-logo" />
                            <p className="title-text">Weathera</p>
                        </div>
                    }
                    onRequestClose={() => setOpenDrawer(false)}
                    closeIcon={
                        <IconButton aria-label="location" color="secondary" >
                            <CancelIcon />
                        </IconButton>
                    }
                    from="bottom"
                    width="100%"
                    height="200px"
                >
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                <div className="infoBox">
                                    <PublicIcon src={coldTemp} className="cardIcon" fontSize="large" />
                                    <div className="cardInfoContainer">
                                        <p className="cardInfoTitle">Location</p>
                                        <p className="cardInfoContent">{weather.name} , {weather.sys.country}</p>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.temp_max &&
                                    <div className="infoBox">
                                        <img src={hotTemp} alt="" className="cardIcon" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Max Temp</p>
                                            <p className="cardInfoContent">{weather.main.temp_max} C°</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.temp &&
                                    <div className="infoBox">
                                        <img src={temp} alt="" className="cardIcon" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Temp</p>
                                            <p className="cardInfoContent">{weather.main.temp} C°</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.feels_like &&
                                    <div className="infoBox">
                                        <img src={temp} alt="" className="cardIcon" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Temp Feels Like</p>
                                            <p className="cardInfoContent">{weather.main.feels_like} C°</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.temp_min &&
                                    <div className="infoBox">
                                        <img src={coldTemp} alt="" className="cardIcon" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Min Temp</p>
                                            <p className="cardInfoContent">{weather.main.temp_min} C°</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.weather.map((weather, index) => {
                                    return (
                                        <div className="infoBox" key={index}>
                                            <FilterDramaIcon className="cardIcon" fontSize="large" />
                                            <div className="cardInfoContainer">
                                                <p className="cardInfoTitle">weather</p>
                                                <p className="cardInfoContent">{weather.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.clouds &&
                                    <div className="infoBox">
                                        <CloudIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Clouds</p>
                                            <p className="cardInfoContent">{weather.clouds.all} %</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.humidity &&
                                    <div className="infoBox">
                                        <BlurOnIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Humidity</p>
                                            <p className="cardInfoContent">{weather.main.humidity} %</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.grnd_level &&
                                    <div className="infoBox">
                                        <GradientIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Ground Level <br /> Pressure</p>
                                            <p className="cardInfoContent">{weather.main.grnd_level} hPa</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.pressure &&
                                    <div className="infoBox">
                                        <GradientIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Pressure</p>
                                            <p className="cardInfoContent">{weather.main.pressure} hPa</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.main.sea_level &&
                                    <div className="infoBox">
                                        <GradientIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Sea Level <br /> Pressure</p>
                                            <p className="cardInfoContent">{weather.main.sea_level} hPa</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                        <Grid item sm={3}>
                            <Card className="infoCard">
                                {weather.wind &&
                                    <div className="infoBox">
                                        <WavesIcon className="cardIcon" fontSize="large" />
                                        <div className="cardInfoContainer">
                                            <p className="cardInfoTitle">Wind</p>
                                            <p className="cardInfoContent">{weather.wind.speed} m/s</p>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                    </Grid>
                </SlidingPane >
            ) : (
                    ""
                )
            }
        </div >
    )
}

export default BottomDrawer
