import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  dialogTitle: string;
  message: string;
  open: boolean;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { onConfirm, onCancel } = props;
  const { dialogTitle, message, open } = props;

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" onClose={onCancel}>
      <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <div>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="secondary" variant="contained">
            Confirm
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
