import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

interface Props  {
  open: boolean,
  postInfo: string[],
  handleClose: () => void;
};

const PostInfo = (props : Props) => {
  //   console.log(props);
  const { open, handleClose, postInfo } = props;
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          json Row data
        </DialogTitle>
        <DialogContent dividers>
          {postInfo?.map((item) => (
            <p>{item}</p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostInfo;
