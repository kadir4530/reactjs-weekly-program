import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import memories from "../../images/memories.png";
import useStyles from './styles.js';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../constants/actionTypes'
import decode from 'jwt-decode'


const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    const logOut = () => {
        dispatch({ type: actionTypes.LOGOUT });
        setUser(null);
        handleClose();
        history.push('/');
    }
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
                        Program
                </Typography>
                    {/* <img className={classes.image} src={memories} alt="memories" height="60"></img> */}
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div>

                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>

                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem className={classes.logout} color='secondary' onClick={logOut}>Logout</MenuItem>
                                    <MenuItem component={Link} to='/changepassword' color='primary' onClick={handleClose}>Change Password</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ) :
                        (
                            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                        )}

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
