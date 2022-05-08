import React from "react";
import { Typography } from "@mui/material/";
import { getUser } from "../firebase";

const CalendarPage = () => {
  let userID = localStorage.getItem("userID")
  getUser(userID).then(result => console.log(result))
  return (
    <div>
      <Typography variant="h2" component="div" color="primary.main">
        Calendar Page
      </Typography>
    </div>
  );
};

export default CalendarPage;
