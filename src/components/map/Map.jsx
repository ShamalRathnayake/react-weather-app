import React, { useEffect, useRef, useState } from 'react'
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import weatherStations from '../city.list.min.json'
import useSupercluster from 'use-supercluster';
import { IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import img1 from '../../assets/m1.png'
import img2 from '../../assets/m2.png'
import img3 from '../../assets/m3.png'
import img4 from '../../assets/m4.png'
import img5 from '../../assets/m5.png'

const mapApiKey = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ setOpenDrawer, fetchWeatherData }) => {


    const initialState = {

        latitude: 7.7918041,
        longitude: 81.4937449,
        zoom: 3

    };

    const [viewport, setViewport] = useState(initialState);
    const [points, setpoints] = useState([]);


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const pointsArr = weatherStations.map(station => {
            return {
                "id": station.id,
                "type": "Feature",
                "properties": {
                    "cluster": false,
                    "name": station.name,
                    "country": station.country
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.coord.lon, station.coord.lat]
                }

            }
        })

        setpoints(pointsArr)



    }, [])


    const mapRef = useRef(null)


    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null;

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 75, maxZoom: 20 }
    });


    const getClusterStyle = (pointCount) => {

        if (pointCount <= 10) {
            return img1
        }
        else if (pointCount <= 20 && pointCount > 10) {
            return img2
        }
        else if (pointCount <= 50 && pointCount > 20) {
            return img3
        }
        else if (pointCount <= 250 && pointCount > 50) {
            return img4
        }
        else if (pointCount > 250) {
            return img5
        }

    }

    const markerClicked = (lat, lon) => {
        setOpenDrawer(true)
        fetchWeatherData(lat, lon)
    }



    return (
        <>
            <MapGL
                style={{ width: '100vw', height: '100vh' }}
                mapStyle='mapbox://styles/zomb101/ckiwvhur456g519mhu60phubp'
                accessToken={mapApiKey}
                onViewportChange={viewport => setViewport(viewport)}
                {...viewport}
                ref={mapRef}
                viewportChangeMethod="easeTo"
            >

                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    const imagePath = getClusterStyle(pointCount)

                    // we have a cluster to render
                    if (isCluster) {
                        return (
                            <Marker
                                key={cluster.id}
                                latitude={latitude}
                                longitude={longitude}
                            >
                                <div
                                    style={{
                                        backgroundImage: "url(" + imagePath + ")",
                                        minHeight: "60px",
                                        minWidth: "60px",
                                        backgroundSize: "cover",
                                        cursor: "pointer",
                                        color: "#fff",
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        lineHeight: "60px",
                                        padding: "5px"
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );

                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: expansionZoom,

                                        });
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    } else {
                        // we have a single point (crime) to render
                        return (
                            <Marker
                                key={cluster.id}
                                latitude={latitude}
                                longitude={longitude}
                                onClick={e => markerClicked(latitude, longitude)}
                            >
                                <IconButton aria-label="location" color="secondary" >
                                    <LocationOnIcon />
                                </IconButton>


                            </Marker>
                        );
                    }

                })}


            </MapGL>;
        </>
    )
}

export default Map
