import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AppTopBar from "../components/AppTopBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <AppTopBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
