import React, { useEffect, useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createActivity, updateActivity } from '../../actions/activities'



export default function FormDialog(props) {
 
  const { currentAcitivity, onClose, value: valueProp, open, ...other } = props;
  const [activity, setactivity] = useState({ name: props.currentAcitivity?.name, _id: props.currentAcitivity?._id });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.currentAcitivity?._id
      ? dispatch(updateActivity(props.currentAcitivity._id, activity))
      : dispatch(createActivity({ name: activity.name }))
    handleClose();
  }
  const handleClose = () => { 
    onClose();
  };
  useEffect(() => {
    setactivity({ name: props.currentAcitivity?.name, _id: props.currentAcitivity?._id })

  }, [open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        {...other}
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">New Activity</DialogTitle>
          <DialogContent   >
            <DialogContentText >
              Please enter activity Name
            </DialogContentText>
            <TextField
              name="activityName"
              autoFocus
              margin="dense"
              id="name"
              label="Activity Name"
              type="text"
              autoComplete='off'
              defaultValue={activity.name}
              onChange={e => { setactivity({ name: e.target.value }) }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={(activity?.name && activity.name.trim()) ? false : true} type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
