import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/Forms/SignIn";
import SignUp from "./Components/Forms/SignUp";
import Navbar from "./Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "./Slices/userSlice";

function App() {
  const { name, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      dispatch(getMembers(token));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
