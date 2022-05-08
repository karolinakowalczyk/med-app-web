import React from "react";
import { Typography } from "@mui/material/";
import { Box } from "@mui/material";
import { getUser, getPatient, getUsersAppointmentsOnDay } from "../firebase";

const CalendarPage = (props) => {
  let userID = localStorage.getItem("userID")
  console.log(userID)
  //getUser(userID).then(result => console.log(result))
  getUsersAppointmentsOnDay(userID, '04-05-2022').then(result => result.forEach((doc) => console.log(doc)))
  //addPrescription('NNh2LItiPagfRh6qAuVwdwvYLdt1', '08-05.2022', userID, [{name: 'ketamine', description: 'ketamina'}], false)
  getPrescriptions('NNh2LItiPagfRh6qAuVwdwvYLdt1', userID).then(result => result.forEach((doc) => console.log(doc)))
  return (
    <Box
      component="main"
      sx={{
        ml: { sm: `${props.drawerWidth}px` },
        p: 3,
      }}
    >
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
    </Box>
  );
};

export default CalendarPage;
