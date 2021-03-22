import React, { useState } from 'react'
import { Button, Grid, Typography, Avatar, Paper, Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './Icon'
import * as actionTypes from '../../constants/actionTypes'
import { updatePassword } from '../../actions/auth'


const initialState = { existingPassword: '', password: '', confirmPassword: '' };
const ChangePassword = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))
    if (!user?.result) history.push('/')
    const dispatch = useDispatch();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updatePassword(formData, history))

    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);


    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>Change Password</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Input name='existingPassword' label='Old Password' handleChange={handleChange} autoFocus type='password' />
                        <Input name='password' label='New Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default ChangePassword;