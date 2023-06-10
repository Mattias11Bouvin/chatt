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

const useStyles = makeStyles({
  dropdownContainer: {
    position: "relative",
  },
  dropdownToggle: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    minWidth: "200px",
  },
  channelList: {
    maxHeight: "200px",
    overflowY: "auto",
    padding: "10px",
  },
  addChannel: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    position: "absolute",
    bottom: "21px",
    left: "106px",
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div className={classes.dropdownToggle} onClick={handleDropdownToggle}>
        Channels {isDropdownOpen ? "▲" : "▼"}
      </div>
      {isDropdownOpen && (
        <div className={classes.dropdownContent}>
          <div className={classes.channelList}>
            {channels.map((channel, index) => (
              <div key={index}>{channel}</div>
            ))}
          </div>
          <div className={classes.addChannel} onClick={handleAddChannelClick}>
            <AddCircleIcon className={classes.addChannelIcon} />
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
      )}
    </div>
  );
};

export default Channels;
