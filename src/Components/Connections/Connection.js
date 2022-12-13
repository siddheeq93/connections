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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Connection = () => {
  let navigate = useNavigate();

  const [userData, setUserData] = useState(List());
  const [addModal, setAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [searchText, setSearchText] = useState("");
  const [stackQueue, setStackQueue] = useState(List());
  const [showConnection, setShowConnection] = useState(false);

  const storedConnections = JSON.parse(localStorage.getItem("userList")) || [];

  useEffect(() => {
    storedConnections && setUserData(fromJS(storedConnections));
  }, []); //eslint-disable-line
  const doesIncludeText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = useMemo(
    () =>
      userData.filter((option) =>
        doesIncludeText(option.get("name", ""), searchText)
      ),
    [searchText, userData]
  );

  const handleSelectUser = (e) => {
    setShowConnection(false);
    setSelectedUser(e.target.value);
  };

  const findConnection = () => {
    setShowConnection(true);
    let stack = [selectedUser];
    let tempSource = selectedUser;
    for (
      let j = 0;
      // userData.getIn([j, "connection"], "") !== selectedTarget;
      j < userData.size;
      j++
    ) {
      let tempItem = Map();

      tempItem = userData.find(
        (item) => item.get("name", "") === tempSource //eslint-disable-line
      );
      console.log({ tempItem });
      if (tempItem === undefined) {
        console.log("if called");
        stack.push("<--");
        setStackQueue(fromJS(stack));
        return "";
      } else if (tempItem.get("connection", "") === selectedTarget) {
        stack.push(selectedTarget);
        setStackQueue(fromJS(stack));
        return "";
      } else {
        console.log("else called");

        stack.push(tempItem.get("connection", ""));
        setStackQueue(fromJS(stack));
        tempSource = tempItem.get("connection", "");
      }
    }

    stack.push(selectedTarget);
    setStackQueue(fromJS(stack));

    return "";
  };

  const handleReset = () => {
    setSelectedTarget("");
    setSelectedUser("");
    setShowConnection(false);
  };
  console.log({ userData });
  return (
    <div className="min-vh-100">
      <nav className="bg-secondary bg-gradient p-3">Raft Labs</nav>
      <div className="d-flex align-items-center bg-light justify-content-center">
        <div className="w-100 container ">
          <div className="row justify-content-center mt-5">
            <div className="col-sm-4 align-items-center">
              <FormControl fullWidth className="mt-2">
                <InputLabel id="demo-simple-select-label">
                  Select User
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select1"
                  placeholder="Select User"
                  MenuProps={{ autoFocus: false }}
                  value={selectedUser}
                  label="Select User"
                  onChange={(e) => handleSelectUser(e)}
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

            <div className="col-sm-4 align-items-center">
              <FormControl fullWidth className="mt-2">
                <InputLabel id="demo-simple-select-label1">
                  Select Connection
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  MenuProps={{ autoFocus: false }}
                  value={selectedTarget}
                  placeholder="Select Connection Name"
                  label="Select Connection"
                  onChange={(e) => setSelectedTarget(e.target.value)}
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
                  {displayedOptions.map((option, i) => (
                    <MenuItem key={i} value={option.get("connection", "")}>
                      {option.get("connection", "")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-sm-2 align-items-center mt-3">
              {" "}
              <Button
                onClick={() => findConnection()}
                fullwidth="true"
                variant="contained"
                disabled={!selectedTarget || !selectedUser}
              >
                Search
              </Button>
            </div>
            <div className="col-sm-2 align-items-center mt-3">
              <Button
                fullwidth="true"
                onClick={() => setAddModal(true)}
                variant="outlined"
              >
                Add User
              </Button>
            </div>
          </div>
          <div className="bg-secondary text-white min-vh-">
            <h3 className="mt-5">
              {showConnection
                ? stackQueue.includes("<--")
                  ? "No match found"
                  : stackQueue.toJS().join("-->")
                : ""}
            </h3>
          </div>
          <div className="row mb-4 mt-5 justify-content-center align-items-center">
            <div className="col-sm-2">
              <Button
                onClick={() => navigate("/")}
                fullwidth="true"
                variant="outlined"
              >
                Back
              </Button>
            </div>
            <div className="col-sm-2">
              <Button
                fullwidth="true"
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      {addModal && (
        <AddConnection
          handleReset={handleReset}
          open={addModal}
          onCancel={() => setAddModal(false)}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
export default Connection;
