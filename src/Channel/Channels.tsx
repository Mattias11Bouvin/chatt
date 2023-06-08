import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
    backgroundColor: "#fff",
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
  },
  addChannelIcon: {
    marginRight: "5px",
  },
});

interface ChannelsProps {
  channels: string[];
  onAddChannel: (channelName: string) => void; // Nytt prop för att hantera tillägg av kanal
}

const Channels: React.FC<ChannelsProps> = ({ channels, onAddChannel }) => {
  const classes = useStyles();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddChannel = () => {
    const channelName = prompt("Enter channel name"); // Prompt användaren att ange kanalnamnet
    if (channelName) {
      onAddChannel(channelName); // Anropa onAddChannel-funktionen från förälderkomponenten
    }
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
          <div className={classes.addChannel} onClick={handleAddChannel}>
            <AddCircleIcon className={classes.addChannelIcon} />
            Add Channel
          </div>
        </div>
      )}
    </div>
  );
};

export default Channels;
