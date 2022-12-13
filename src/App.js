import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chessboard from "./Components/Chess/Chessboard";
import Connection from "./Components/Connections/Connection";
import LandingPage from "./Components/Home/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/connection" element={<Connection />}></Route>
        <Route path="/chess_board" element={<Chessboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
