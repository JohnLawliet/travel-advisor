import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react"
import useStyles from './header.styles'

const Header = ({setCoordinates}) => {
    const classes = useStyles()
    const [autoComplete, setAutoComplete] = useState(null)

    // onLoad and onPlaceChanged is required for <autoComplete />
    // Note that the api key from https://console.cloud.google.com/ is to be copy pasted in index.html as
    // <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=<MY_KEY>"></script>
    // for onPlaceChanged() lookup react google maps 
    const onLoad = (autoC) => setAutoComplete(autoC)
    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat()
        const lng = autoComplete.getPlace().geometry.location.lng()

        setCoordinates({lat, lng})
    } 

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                        </div>                    
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
