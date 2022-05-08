import React from "react";
import { Box } from "@mui/material/";
import ErrorMessage from "../components/ErrorMessage";

const NotFound = (props) => {
  return (
    <Box
      component="main"
      maxWidth="sm"
      sx={{
        ml: { sm: `${props.drawerWidth}px` },
        p: 3,
      }}
    >
      <ErrorMessage message="Not Found"> </ErrorMessage>{" "}
    </Box>
  );
};

export default NotFound;
