
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getActivities } from '../../actions/activities'
import { setActivity } from '../../actions/program'
import { FormControlLabel, Button, DialogTitle, DialogContent, DialogActions, Dialog, RadioGroup, Radio } from '@material-ui/core';

function SelectActivity(props) {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities)
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState({ _id: '', name: '' });
    const [postData, setPostData] = useState({ dayId: props.selectedProgram.dayId, hourId: props.selectedProgram.hourId, activity: { _id: '', name: '' } })
    const radioGroupRef = useRef(null);

    useEffect(() => {
        dispatch(getActivities)
        if (!open) {
            setValue(valueProp);
        }
        setData();
    }, [valueProp, open, value]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        dispatch(setActivity(postData))
        onClose(value);
    };

    const handleChange = (e) => {
        setValue(e.target.value)

    };

    const setData = () => {
        const activity = activities.find(a => a._id == value)
        setPostData({ dayId: props.selectedProgram.dayId, hourId: props.selectedProgram.hourId, activity: { _id: activity?._id, name: activity?.name } })
    }

    return (
        <Dialog
            disableBackdropClickq
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Activities</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {activities.map((option) => (
                        <FormControlLabel value={option._id} key={option._id} control={<Radio />} label={option.name} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
        </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
        </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectActivity;