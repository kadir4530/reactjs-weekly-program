import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    test: {
        border: '1px solid',
        borderRadius: 15,
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 10px',
    },
    title: {
        float: 'left',
        border: '1px solid',
        borderRadius: "10px",
        width: '90%',
        fontSize: '20px'

    },
    addButton: {
        width: '90%',
        margin:"5px 0"
    },
    editButton: {
    },
    deleteButton: {

    }
}));