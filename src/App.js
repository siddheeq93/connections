import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chessboard from "./Components/Chess/Chessboard";
import LandingPage from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/chess_board" element={<Chessboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
