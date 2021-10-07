import GoogleMapReact from "google-map-react"
import {Paper, useMediaQuery, Typography} from '@material-ui/core'

import useStyles from './map.styles'
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"
import map from "./map"
            
// {                
//     weatherData?.list?.map((data, i) => (
//         <div
//             key={i}
//             lat={data.coord.lat}
//             lng={data.coord.lon}
//         >
//             <img height={100} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"/>
//         </div>
//     ))
// }
const Map = ({coordinates, setBounds, setCoordinates, places, setChildClicked}) => {
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width:600px)')
    // console.log("weatherData : ",weatherData)

    // NOTE:
    // GoogleMapReact requires lng and lat instead of longitude and latitude
    // onChildClick={''} => event listenere for click events
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: map}}
                onChildClick={child => setChildClicked(child)}
                onChange={e => {
                    setCoordinates({
                        lat: e.center.lat, lng:e.center.lng
                    })
                    setBounds({
                        ne:e.marginBounds.ne,
                        sw:e.marginBounds.sw
                    })
                }}
            >
            {
                places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lng={Number(place.longitude)}
                        lat={Number(place.latitude)}
                        key={i}
                    >
                    {
                        isMobile? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img 
                                 src={place.photo? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                                 className={classes.pointer}
                                 alt={place.name}
                                />
                                <Rating 
                                    size="small"
                                    value={Number(place.rating)}
                                    readOnly
                                />
                            </Paper>
                        )
                    }
                    </div>
                ))
            }
            </GoogleMapReact>
        </div>
    )
}

export default Map
