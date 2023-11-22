import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';




export function ConfirmDialog() {
    const { dialogData, successCb, failCb } = useSelector(state => state.dialogMsgModule)
    const dispatch = useDispatch()
    const useStyles = makeStyles({
        root: {
            '& .MuiDialog-container': {
                '& .MuiPaper-root': {
                    '& .MuiDialogActions-root': {
                        '& .no-btn': {
                            color: 'orangered'
                        }

                    },


                }
            }
        }
    });
    // const [open, setOpen] = useState(false);
    const classes = useStyles()

    // const handleClickOpen = () => {
    //   setOpen(true);

    // };

    const handleClose = (isConfirm) => {
        if (isConfirm) successCb('thingy things')
        else failCb()
        dispatch({ type: 'SET_DIALOG_CLOSE' })
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
            <Dialog
                open={!!dialogData}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.root}
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogData?.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogData?.txt}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='no-btn' onClick={() => handleClose(false)}>Cancel</Button>
                    <Button onClick={() => handleClose(true)} autoFocus>
                        I'm Sure
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
