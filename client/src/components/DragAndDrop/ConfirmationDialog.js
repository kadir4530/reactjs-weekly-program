
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ConfirmationDialogRaw from './ConfirmationDialogRaw'

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

export default function ConfirmationDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <List component="div" role="list">
                <ListItem button divider disabled role="listitem">
                    <ListItemText primary="Interruptions" />
                </ListItem>
                <ListItem
                    button
                    divider
                    aria-haspopup="true"
                    aria-controls="ringtone-menu"
                    aria-label="phone ringtone"
                    onClick={handleClickListItem}
                    role="listitem"
                >
                    <ListItemText primary="Phone ringtone" secondary={value} />
                </ListItem>
                <ListItem button divider disabled role="listitem">
                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                </ListItem>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    value={value}
                />
            </List>
        </div>
    );
}

