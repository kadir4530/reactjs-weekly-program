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
    table: {
        minWidth: 650,
    },
    tableCell: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'aliceblue',
            borderRadius: '10px'
            
        }
    }
}));