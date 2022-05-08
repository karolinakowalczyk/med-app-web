import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getPatient, getAllPatients } from "../firebase";

const PatientsTable = (props) => {
  //not work
  getAllPatients("akRU3kHoRLdpqXh3TGCDcDoVuMw1").then((result) =>
    console.log(result)
  );
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
      <Typography component="h1" variant="h5">
        Your patients
      </Typography>
    </Box>
  );
};

export default PatientsTable;
