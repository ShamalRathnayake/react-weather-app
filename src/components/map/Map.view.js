import React, { lazy, Suspense, useRef } from 'react'
import MapGL, { GeolocateControl, Marker, NavigationControl } from '@urbica/react-map-gl';
import MapLogic from './Map.logic';
import { IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Loading from '../loading/Loading';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import('./map.css')

require('dotenv').config()
const mapApiKey = process.env.REACT_APP_MAPBOX_KEY;

const BottomDrawer = lazy(() => import('../bottomDrawer/BottomDrawer'))

const MapView = ({ weather, fetchWeatherData }) => {

    const mapRef = useRef(null);

    const {
        viewport,
        setViewport,
        clusters,
        getClusterStyle,
        markerClicked,
        mapClusterZoom,
        openDrawer,
        setOpenDrawer,
        mapZoomOut,
        isLoading
    } = MapLogic({ fetchWeatherData, mapRef });


    return (
        <div className="mapContainer">
            <MapGL
                style={{ height: "100vh", width: "100vw" }}
                mapStyle='mapbox://styles/zomb101/ckiwvhur456g519mhu60phubp'
                accessToken={mapApiKey}
                onViewportChange={viewport => setViewport(viewport)}
                {...viewport}
                ref={mapRef}
                viewportChangeMethod="easeTo"
                dragRotate={false}
            >
                <IconButton aria-label="zoom out" onClick={() => mapZoomOut()} id="zoomOutIcon">
                    <ZoomOutMapIcon />
                </IconButton>

                <GeolocateControl
                    position='bottom-right'
                    showUserLocation={false}
                    trackUserLocation={false}

                />
                <NavigationControl
                    showCompass={false}
                    showZoom
                    position='bottom-right'
                />


                {clusters.map((cluster) => {



                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    const imagePath = getClusterStyle(pointCount)


                    if (isCluster) {
                        return (
                            <Marker
                                key={cluster.id}
                                latitude={latitude}
                                longitude={longitude}
                            >
                                <div
                                    style={{ backgroundImage: "url(" + imagePath + ")" }}
                                    className="clusterMarker"
                                    onClick={() => mapClusterZoom(cluster.id, latitude, longitude)}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    } else {

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
                })
                }
            </MapGL>;
            <Suspense fallback={<Loading />}>
                <BottomDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} weather={weather} isLoading={isLoading} />
            </Suspense>

        </div>
    )
}

export default MapView
