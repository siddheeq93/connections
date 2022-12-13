import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Chessboard = () => {
  let navigate = useNavigate();
  
  const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontal = ["h", "g", "f", "e", "d", "c", "b", "a"];
 
  const [cellsToHighlight, setCellsToHighlight] = useState([]);
  const [selectedCell, setSelectedCell] = useState("");
  
  const handlePossibleMoves = (e, i, j) => {
    setSelectedCell(horizontal[i] + vertical[j]);
    setCellsToHighlight([
      horizontal[i - 1] + vertical[j - 2],
      horizontal[i - 2] + vertical[j - 1],
      horizontal[i + 1] + vertical[j + 2],
      horizontal[i + 2] + vertical[j + 1],
      horizontal[i + 1] + vertical[j - 2],
      horizontal[i + 2] + vertical[j - 1],
      horizontal[i - 1] + vertical[j + 2],
      horizontal[i - 2] + vertical[j + 1],
    ]);
  };

  const getChessBoard = () => {
    let chessTemplates = [];
    for (let i = 0; i < horizontal.length; i++) {
      for (let j = 0; j < vertical.length; j++) {
        let index = i + j + 2;
        chessTemplates.push(
          <div
            id={horizontal[i] + vertical[j]}
            className={`${index % 2 === 0 ? "white-tile" : "black-tile"} ${
              selectedCell === horizontal[i] + vertical[j]
                ? "selected-tile"
                : cellsToHighlight.includes(horizontal[i] + vertical[j])
                ? "highlighted-tiles"
                : ""
            }`}
            onClick={(e) => handlePossibleMoves(e, i, j)}
          >
            {horizontal[i]}
            {vertical[j]}
          </div>
        );
      }
    }
    return chessTemplates;
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="instructions-bar">
        <h2 className="mt-4">Instructions</h2>
        <h4 className="mt-3">The Knight Moves</h4>
        <p>
          Click on any cell in the chessboard to see all the possible moves of a
          knight
        </p>
        <Button onClick={() => navigate(-1)} variant='outlined' className="text-dark">Back</Button>
      </div>
      <div className="chessboard">
        {getChessBoard()}
      </div>
    </div>
  );
};
export default Chessboard;
