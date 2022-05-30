import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import CalendarPage from "../pages/CalendarPage";
import AppTopBar from "../components/AppTopBar";
import PatientsDetails from "../pages/PatientsDetails";
import PatientsTable from "../pages/PatientsTable";
import Profile from "../pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const drawerWidth = 240;

const MainRoute = () => {
  return (
    <BrowserRouter>
      <AppTopBar drawerWidth={drawerWidth} />
      <Routes>
        <Route path="*" element={<NotFound drawerWidth={drawerWidth} />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/calendar"
          element={<CalendarPage drawerWidth={drawerWidth} />}
        />
        <Route
          path="/patient-details/:id"
          element={<PatientsDetails drawerWidth={drawerWidth} />}
        />
        <Route
          path="/patients-table"
          element={<PatientsTable drawerWidth={drawerWidth} />}
        />
        <Route
          path="/account"
          element={<Profile drawerWidth={drawerWidth} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
