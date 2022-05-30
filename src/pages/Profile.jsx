import React from "react";
import { Box } from "@mui/material/";
import ErrorMessage from "../components/ErrorMessage";

const Profile = (props) => {
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
      <h1>czesc</h1>
    </Box>
  );
};

export default Profile;
