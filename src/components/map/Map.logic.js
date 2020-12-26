import { useEffect, useState } from 'react'
import useSupercluster from 'use-supercluster';
import weatherStations from '../city.list.min.json'
import img1 from '../../assets/m1.png'
import img2 from '../../assets/m2.png'
import img3 from '../../assets/m3.png'
import img4 from '../../assets/m4.png'
import img5 from '../../assets/m5.png'
import { v4 as uuidv4 } from 'uuid';

const MapLogic = ({ fetchWeatherData, mapRef }) => {

    const initialState = {
        latitude: 7.7918041,
        longitude: 81.4937449,
        zoom: 3
    };

    const [viewport, setViewport] = useState(initialState);
    const [points, setpoints] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const pointsArr = weatherStations.map(station => {
            return {
                "id": uuidv4(),
                "type": "Feature",
                "properties": {
                    "cluster": false,
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.coord.lon, station.coord.lat]
                }

            }
        })

        setpoints(pointsArr);

    }, [])

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


    const mapClusterZoom = (id, latitude, longitude) => {

        const expansionZoom = Math.min(
            supercluster.getClusterExpansionZoom(id),
            20
        );

        setViewport({
            ...viewport,
            latitude,
            longitude,
            zoom: expansionZoom,

        });
    }

    const mapZoomOut = () => {
        setViewport({ ...viewport, zoom: 3 })
    }

    return {
        viewport,
        setViewport,
        clusters,
        supercluster,
        getClusterStyle,
        markerClicked,
        mapClusterZoom,
        openDrawer,
        setOpenDrawer,
        mapZoomOut
    }
}

export default MapLogic
