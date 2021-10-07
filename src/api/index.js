import axios from 'axios'



export const getPlacesData = async (type, sw, ne) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    try{
        const {data: {data}} = await axios.get(URL, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            limit: '15',
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
          }
        })
        return data
    }
    catch(err){
        console.log(err)
    }
}

// export const getWeatherData = async(lat, lng) => {
//   const URL = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
//   try{
//     const {data} = await axios.get(URL, {
//       params: {q: `${lat},${lng}`},
//       headers: {
//         'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
//         'x-rapidapi-key': '24a9687d73msh90f4f0f5604eddep11ff3ajsn27a069ad4341'
//       }
//     })
//     return data
//   }
//   catch(err){
//     console.log(err)
//   }
// }