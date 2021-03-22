import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import SelectActivity from './SelectActivity'
import useStyles from './styles.js';
import PropTypes from 'prop-types';


import { getProgram } from '../../actions/program'

SelectActivity.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export default function BasicTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedProgram, setSelectedProgram] = useState({ hourId: '', dayId: '', activity: { _id: '', name: '' } });
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const user = JSON.parse(localStorage.getItem('profile'));


    const handleClickListItem = (hourId, dayId, activityId) => {
        setSelectedProgram({ hourId, dayId })
        setValue(activityId)
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);
        newValue && setValue(newValue)
    };

    let data = []
    useEffect(() => {
        dispatch(getProgram())
    }, [dispatch])
    const program = useSelector(state => state.program);

    let days = [];
    let firstDay = {};
    let i = 0;
    Object.keys(program).map(function (key, index) {
        days = (program[key].days)
        firstDay = days[0];
        firstDay.hour.map((hour) => {
            const row = { 0: { _id: hour._id, name: hour.name }, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} }
            for (let index = 0; index < days.length; index++) {
                const dayId = days[index]._id;
                row[`${index + 1}`] = {
                    dayId: dayId,
                    activity: days[index].hour.find(h => h.name === hour.name).activity
                }

            }
            data.push(row);
        })
    });

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>Hours</strong></TableCell>
                            {
                                days.map(day => (
                                    <TableCell align="center" key={day._id}><strong>{day.name}</strong></TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(dt => (
                                <TableRow key={i++}>
                                    <TableCell align="left">{dt[0].name}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[1].dayId, dt[1].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[1].dayId)}*/ align="center">{dt[1].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[2].dayId, dt[2].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[2].dayId)}*/ align="center">{dt[2].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[3].dayId, dt[3].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[3].dayId)}*/ align="center">{dt[3].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[4].dayId, dt[4].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[4].dayId)}*/ align="center">{dt[4].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[5].dayId, dt[5].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[5].dayId)}*/ align="center">{dt[5].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[6].dayId, dt[6].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[6].dayId)}*/ align="center">{dt[6].activity?.name || '--'}</TableCell>
                                    <TableCell className={classes.tableCell} aria-haspopup="true" aria-controls="Activity Menu" aria-label="Activity" onClick={() => handleClickListItem(dt[0]._id, dt[7].dayId, dt[7].activity?._id)} /*onClick={() => handleClickOpen(dt[0]._id, dt[7].dayId)}*/ align="center">{dt[7].activity?.name || '--'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <SelectActivity
                        classes={{
                            paper: classes.paper,
                        }}
                        id="ringtone-menu"
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        value={value}
                        selectedProgram={selectedProgram}
                    />
                </Table>
            </TableContainer >
        </div>

    );
}