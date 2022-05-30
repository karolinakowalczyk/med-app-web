import React from "react";
import { Typography } from "@mui/material/";
import { Box } from "@mui/material";
import {
  getUser,
  getPatient,
  getUsersAppointmentsOnDay,
  updatePrescription,
  getAllPatients,
  getUsersAppointmentsBetween,
  getAppointmentCategories,
  getDoctorAppointmentCategories,
  addDoctorAppointmentCategory
} from "../firebase";
import Calendar from "../components/Calendar";

const CalendarPage = (props) => {
  let userID = localStorage.getItem("userID");
  addDoctorAppointmentCategory(userID, 30, '5as97ERlRoLXCG746eE2', "Wiertło", 100).then(() => {
    console.log('DUPA')
    getDoctorAppointmentCategories(userID)
  })
  //console.log(userID);
  //getUser(userID).then(result => console.log(result))
  // getUsersAppointmentsOnDay(userID, "09-05-2022").then((result) =>
  //   result.forEach((doc) => console.log(doc))
  // );

  //getAllPatients(userID).then((result) => console.log(result));

  //getUsersAppointmentsBetween(userID, new Date('2022-05-09'), new Date('2022-05-11')).then(result => console.log(result))
  //getAllPatients(userID).then(result => console.log(result[0]))

  //addPrescription('NNh2LItiPagfRh6qAuVwdwvYLdt1', '08-05.2022', userID, [{name: 'ketamine', description: 'ketamina'}], false)
  // updatePrescription("NNh2LItiPagfRh6qAuVwdwvYLdt1", "HjmqG5TTjxlzfdQrVhqz", {
  //   date: "08-05-2022",
  // });
  return (
    <Box
      component="main"
      sx={{
        ml: {
          sm: `${props.drawerWidth}px`,
        },
        p: 3,
      }}
    >
      <Calendar></Calendar>
    </Box>
  );
};

export default CalendarPage;
