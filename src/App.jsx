import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import { AddLogs } from "./pages/AddLogs";
import { Logs } from "./pages/Logs";
import { ShowNote } from "./pages/ShowNotes";
import { AddNotes } from "./pages/AddNotes";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { UpdateNotes } from "./pages/UpdateNotes";
import { UpdateLogs } from "./pages/UpdateLogs";

function App() {
  const location = useLocation();
  const user = localStorage.getItem("token");

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <div className="">
      {/* <BrowserRouter> */}
        {/* If user is authenticated, navigate to Home, else show login */}
        <Routes location={location} key={location.pathname}>
          {isAuthenticated ? (
            <>
              {/* <Route path="/" element={<Navigate to="/home" />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/addNote" element={<AddNotes />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/add-log" element={<AddLogs />} />
              <Route path="/note" element={<ShowNote />} />
              <Route path="/update-note" element={<UpdateNotes />} />
              <Route path="/update-log" element={<UpdateLogs />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
