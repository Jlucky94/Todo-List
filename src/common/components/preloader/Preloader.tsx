import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

export const Preloader = () => {
    return (
        <Grid sx={{height: '100%'}} container alignItems={'center'} justifyContent={'center'}>
            <CircularProgress size={200}/>
        </Grid>
    )
}
