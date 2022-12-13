import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const LandingPage = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-8 mx-auto bg-info h-50 ">
          <div className="row justify-content-center align-items-center">
            <div className="col-">
              <h1 className="mt-5">Welcome</h1>
              <div className="row mt-4 justify-content-center">
                <div className="col-sm-3 col-md-4 mt-3">
                  <Link to="/connection">
                    <Button fullWidth variant="contained">
                      Connection
                    </Button>
                  </Link>
                </div>
                <div className="col-sm-3 col-md-4 mt-3">
                  {" "}
                  <Link to="/chess_board">
                    <Button fullWidth variant="contained">
                      Chess
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
