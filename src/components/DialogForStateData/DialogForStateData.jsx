import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import SimpleTable from '../SimpleTable/SimpleTable';
import { API_PREFIX } from '../../config';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function DialogForStateData({ country, showDialog, onClose }) {

    const [stateInfo, setStateInfo] = useState([]);
    useEffect(() => {
        const url = `${API_PREFIX}/gov/${country}`;
        fetch(url)
            .then(response => response.json())
            .then(stateWiseData => {
                setStateInfo(stateWiseData.states);
            })
    }, [country]);

    const handleClose = () => {
        onClose();
    };

    return (

        <Dialog fullWidth onClose={handleClose} aria-labelledby="dialog-title" open={showDialog} maxWidth={'md'}>
            <DialogTitle onClose={handleClose}> StateWise Data [{country}] </DialogTitle>
            <DialogContent dividers>
                {
                    stateInfo?.length ? (
                        <SimpleTable header={Object.keys(stateInfo[0])} body={stateInfo} />
                    ) : (
                            <Typography gutterBottom >
                                No data available
                            </Typography>
                        )
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SimpleTable.propTypes = {
    country: PropTypes.string,
    showDialog: PropTypes.bool,
    onClose: PropTypes.func
};

export default DialogForStateData;