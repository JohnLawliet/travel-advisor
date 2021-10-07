import './App.css';
import Header from './components/header/header.component';
import {CssBaseline, Grid} from '@material-ui/core'
import Map from './components/map/map.component';
import List from './components/list/list.component';
import { useEffect, useState } from 'react';
import { getPlacesData, getWeatherData } from './api';

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  // const [weatherData, setWeatherData] = useState([])
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState(0)

  // this is to get the user initial location first upon page load
  // navigator.geolocation uses window browser and not google maps
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {longitude, latitude}}) => {
      // console.log("data : ",data)
      setCoordinates({
        lat:latitude,
        lng:longitude
      })
    })
  },[])

  // useEffect for filtering
  useEffect(() => {
    const filteredPlaces = places?.filter(place => place.rating >= parseFloat(rating))
    setFilteredPlaces(filteredPlaces)
  },[rating])

  // this useeffect runs whenever the use changes location on map
  // if (bounds) would always be truthy as {} is recognized as truthy
  useEffect(() => {
    if (bounds.ne && bounds.sw){
      setIsLoading(true)

      // getWeatherData(coordinates.lat, coordinates.lng)
      // .then(data => {
      //   console.log("data : ",data)
      //   // setWeatherData({
      //   //   lat: location.lat, 
      //   //   lng: location.lon,
      //   //   icon: current.condition.icon
      //   // })
      // })

      getPlacesData(type, bounds.sw, bounds.ne)
      .then(data => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
        setRating(0)
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  },[type, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length? filteredPlaces : places} 
          childClicked={childClicked} 
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates} 
            setBounds={setBounds} 
            coordinates={coordinates}
            places={filteredPlaces.length? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>

    </>
  );
}

export default App;
