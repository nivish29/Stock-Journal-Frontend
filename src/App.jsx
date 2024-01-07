import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import { AddNotes } from "./pages/AddNotes'
import { AddLogs} from "./pages/AddLogs.jsx";
import { Logs } from "./pages/Logs.jsx";
import { ShowNote } from "./pages/ShowNotes.jsx";

function App() {
  const lc = useLocation();
  return (
    <div className="">
      <div><Routes location={lc} key={lc.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/addNote" element={<AddNotes />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/add-log" element={<AddLogs />} /> 
        <Route path="/note" element={<ShowNote />} />
      </Routes></div>
    </div>
  );
}

export default App;
