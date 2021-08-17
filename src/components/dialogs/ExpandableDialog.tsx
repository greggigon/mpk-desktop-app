import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';

interface ExpandableDialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onDialogSizeChanged: (size: 'md' | 'xl') => void;
}

const XL = 'xl';
const MD = 'md';

export default function ExpandableDialog(props: ExpandableDialogProps) {
  const { children, title } = props;
  const { open, onClose, onDialogSizeChanged } = props;
  const [dialogSize, setDialogSize] = React.useState('md');
  const [dialogMaximised, setDialogMaximised] = React.useState(false);

  const changeDialogSize = () => {
    if (dialogSize === MD) {
      setDialogSize(XL);
      setDialogMaximised(true);
      onDialogSizeChanged(XL);
    } else {
      setDialogSize(MD);
      setDialogMaximised(false);
      onDialogSizeChanged(MD);
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={dialogSize}
      onClose={onClose}
    >
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <div style={{ padding: '5px' }}>
          {dialogMaximised ? (
            <Tooltip title="Minimase dialog" placement="top" arrow>
              <IconButton aria-label="resize-dialog" onClick={changeDialogSize}>
                <FullscreenExit />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Maximise dialog" placement="top" arrow>
              <IconButton aria-label="resize-dialog" onClick={changeDialogSize}>
                <Fullscreen />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      {children}
    </Dialog>
  );
}
