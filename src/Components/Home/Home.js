import React, { useEffect, useMemo, useState } from "react";
import { List, fromJS, Map } from "immutable";
import AddConnection from "../Modals/AddConnection";
import {
  FormControl,
  InputLabel,
  Select,
  ListSubheader,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import "../style.css";
import SearchIcon from "@mui/icons-material/Search";
const LandingPage = () => {
  const [connectionsState, setConnectionsState] = useState(List());
  const [addModal, setAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [searchText, setSearchText] = useState("");
  const [stackQueue, setStackQueue] = useState(List());
  const storedConnections = JSON.parse(localStorage.getItem("userList")) || [];

  useEffect(() => {
    storedConnections && setConnectionsState(fromJS(storedConnections));
  }, []); //eslint-disable-line
  const doesIncludeText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = useMemo(
    () =>
      connectionsState.filter((option) =>
        doesIncludeText(option.get("name", ""), searchText)
      ),
    [searchText, connectionsState]
  );

  const findConnection = () => {
    let stack = [selectedUser];
    let tempSource = selectedUser;
    for (
      let j = 0;
      connectionsState.getIn([j, "connection"], "") !== selectedTarget;
      j++
    ) {
      let tempItem = Map();

      tempItem = connectionsState.find(
        (item) => item.get("name", "") === tempSource //eslint-disable-line
      );

      if (tempItem.get("connection", "") !== selectedTarget) {
        stack.push(tempItem.get("connection", ""));
        tempSource = tempItem.get("connection", "");
      }
    }

    stack.push(selectedTarget);
    setStackQueue(fromJS(stack));

    return "";
  };

  return (
    <>
      <nav class="navbar navbar-light bg-secondary bg-gradient">
        <span class="navbar-brand mb-0 h1 p-3">Raft Labs</span>
      </nav>{" "}
      <div className="container">
        <div className="auto-margin mt-5 w-25">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select User</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select1"
              placeholder="Select User"
              MenuProps={{ autoFocus: false }}
              value={selectedUser}
              label="Select User"
              onChange={(e) => setSelectedUser(e.target.value)}
              onClose={() => setSearchText("")}
            >
              <ListSubheader>
                <TextField
                  size="small"
                  autoFocus
                  placeholder="Type to search..."
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {displayedOptions.map((option, i) => (
                <MenuItem key={i} value={option.get("name", "")}>
                  {option.get("name", "")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="auto-margin mt-5 w-25">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label1">
              Connection With
            </InputLabel>

            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              MenuProps={{ autoFocus: false }}
              value={selectedTarget}
              placeholder="Select Connection Name"
              label="Connection With"
              onChange={(e) => setSelectedTarget(e.target.value)}
              onClose={() => setSearchText("")}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            >
              <ListSubheader>
                <TextField
                  size="small"
                  autoFocus
                  placeholder="Type to search..."
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape") {
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              {displayedOptions.map((option, i) => (
                <MenuItem key={i} value={option.get("connection", "")}>
                  {option.get("connection", "")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-3 row justify-content-center">
          <div className="col-sm-2 align-items-center">
            <Button
              className
              fullWidth
              onClick={() => setAddModal(true)}
              variant="outlined"
            >
              Add User
            </Button>
          </div>
          <div className="col-sm-2 align-items-center">
            <Button
              onClick={() => findConnection()}
              fullWidth
              variant="contained"
              disabled={!selectedTarget || !selectedUser}
            >
              Search
            </Button>
          </div>{" "}
        </div>
      </div>
      <div>
        <h3>{stackQueue.toJS().join("-->")}</h3>
      </div>
      {addModal && (
        <AddConnection
          open={addModal}
          onCancel={() => setAddModal(false)}
          connectionsState={connectionsState}
          setConnectionsState={setConnectionsState}
        />
      )}
    </>
  );
};
export default LandingPage;
