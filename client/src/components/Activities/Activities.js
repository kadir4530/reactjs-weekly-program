import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActivities } from '../../actions/activities'
import { List, ListItem, Grid, ListItemText, Typography, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import useStyles from './styles.js';
import ActivityForm from './ActivityForm.js' 
import { deleteActivity } from '../../actions/activities'


const Activities = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentAcitivity, setcurrentAcitivity] = useState({ _id: null, name: '' });
    const [open, setOpen] = useState(false); 
    const activities = useSelector(state => state.activities)

    useEffect(() => {
        dispatch(getActivities())
        setcurrentAcitivity(null)
    }, [dispatch])

    const handleClickOpen = () => {
        setOpen(true); 
    };


    const handleClose = () => {
        setcurrentAcitivity(null)
        setOpen(false);
    };

    const deleteClick = (id) => {
        dispatch(deleteActivity(id))
    }


    return (
        <div>

            <ActivityForm open={open} currentAcitivity={currentAcitivity} onClose={handleClose} />

            <Grid Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <Typography variant="h6" className={classes.title} align="center">
                        Activities
                </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                        className={classes.addButton}
                        startIcon={<AddBoxRoundedIcon />}

                    >Add</Button>

                    <div className={classes.demo}>

                        <List id='list'>
                            {
                                activities &&
                                activities.map((activity, index) => (
                                    <ListItem key={activity._id} >
                                        <ListItemText key={index}
                                            primary={activity.name}
                                        />
                                        <Button className={classes.editButton}
                                            onClick={() => {
                                                setcurrentAcitivity({ _id: activity._id, name: activity.name })
                                                setOpen(true) 
                                            }
                                            }
                                        ><EditIcon /></Button>
                                        <Button onClick={() => { deleteClick(activity._id) }}><DeleteIcon /></Button>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </Grid>
            </Grid >
        </div >

    )
}

export default Activities
