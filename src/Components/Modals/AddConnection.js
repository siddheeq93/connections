import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { List, fromJS } from "immutable";
import PropTypes from "prop-types";
import "../Home/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddConnection = (props) => {
  const { open, onCancel, setUserData, userData, handleReset } = props;
  const [name, setName] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [connectionName, setConnectionName] = useState("");
  const connectionTypes = [{ name: "Friend", value: "friend" }];

  const handleName = (e) => {
    setName(e.target.value.trim());
  };

  const handleConnectionName = (e) => {
    setConnectionName(e.target.value.trim());
  };

  const handleConnectionType = (option) => {
    setConnectionType(option.target.value);
  };

  const handleSave = () => {
    if (userData.map((item) => item.get("name", "")).includes(name)) {
      toast.warn("User already exist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return "";
    }
    let tempArr = [];
    tempArr = JSON.parse(localStorage.getItem("userList")) || [];
    tempArr.push({ name, connection: connectionName });
    setUserData(
      userData.set(userData.size, fromJS({ name, connection: connectionName }))
    );

    localStorage.setItem("userList", JSON.stringify(tempArr));
    toast.success("User added successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    handleReset();
    onCancel();
  };
  return (
    <Dialog open={open} onClose={onCancel} fullWidth>
      <DialogTitle>Add Connection</DialogTitle>
      <DialogContent>
        <div className="container ">
          <div className="row height-100 justify-content-center align-items-center">
            <div className="col-sm-4">
              <TextField
                id="outlined-name"
                label="Name"
                value={name}
                onChange={(e) => handleName(e)}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </div>

            <div className="col-sm-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={connectionType}
                  label="Mode"
                  onChange={handleConnectionType}
                >
                  {connectionTypes.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="col-sm-4">
              <TextField
                id="outlined-name"
                label={
                  connectionType
                    ? `${
                        connectionType[0].toUpperCase() +
                        connectionType.substring(1)
                      }'s Name`
                    : "Connection Name"
                }
                value={connectionName}
                onChange={(e) => handleConnectionName(e)}
                inputProps={{
                  maxLength: 20,
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="pb-3 pr-4">
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!name || !connectionType || !connectionName}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AddConnection.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  userData: PropTypes.instanceOf(List),
  handleReset: PropTypes.func,
};
export default AddConnection;
