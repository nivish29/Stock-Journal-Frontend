import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import { AddLogs} from "./pages/AddLogs";
import { Logs } from "./pages/Logs";
import { ShowNote } from "./pages/ShowNotes";
import { AddNotes } from "./pages/AddNotes";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";

function App() {
  const lc = useLocation();
  return (
    <div className="">
      <div><Routes location={lc} key={lc.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addNote" element={<AddNotes />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/add-log" element={<AddLogs />} /> 
        <Route path="/note" element={<ShowNote />} />
      </Routes></div>
    </div>
  );
}

export default App;
