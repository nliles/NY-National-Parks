import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ParkView from "./screens/Park/components/ParkView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/parks/:id" element={<ParkView />} />
    </Routes>
  </BrowserRouter>
);
