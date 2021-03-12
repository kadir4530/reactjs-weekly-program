import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Activities from '../Activities/Activities'
import Program from '../Prgoram/Program'
import { useHistory } from 'react-router-dom'
const Home = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <div>
            {
                user ? (
                    <Grid container>
                        <Grid item sx={12} sm={3}>
                            <Activities />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Program />
                        </Grid>
                    </Grid>
                )
                    : history.push('/auth')
            }
        </div>

    )
}

export default Home
