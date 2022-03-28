import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import AppTopBar from "../components/AppTopBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <AppTopBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
