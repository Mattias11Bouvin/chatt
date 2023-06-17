import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FaHashtag } from "react-icons/fa";

const useStyles = makeStyles({
  dropdownContainer: {
    position: "relative",
  },
  addChannel: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    position: "absolute",
  },
  addChannelIcon: {
    marginRight: "5px",
  },
});

interface ChannelsProps {
  channels: string[];
  onAddChannel: (channelName: string) => void;
}

const Channels: React.FC<ChannelsProps> = ({ channels, onAddChannel }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const handleAddChannelClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (newChannelName) {
      onAddChannel(newChannelName);
    }
    setOpen(false);
    setNewChannelName("");
  };

  return (
    <div className={classes.dropdownContainer}>
      <div className={classes.addChannel} onClick={handleAddChannelClick}>
        <FaHashtag className={classes.addChannelIcon} />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new channel.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            type="text"
            fullWidth
            value={newChannelName}
            onChange={(event) => setNewChannelName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Channels;
