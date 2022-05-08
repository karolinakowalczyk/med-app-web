import React from "react";
import { Typography } from "@mui/material/";
import { getUser, getPatient, getUsersAppointmentsOnDay } from "../firebase";

const CalendarPage = () => {
  let userID = localStorage.getItem("userID")
  console.log(userID)
  //getUser(userID).then(result => console.log(result))
  getUsersAppointmentsOnDay(userID, '04-05-2022').then(result => result.forEach((doc) => console.log(doc)))
  return (
    <div>
      <Typography variant="h2" component="div" color="primary.main">
        Calendar Page
      </Typography>
    </div>
  );
};

export default CalendarPage;
