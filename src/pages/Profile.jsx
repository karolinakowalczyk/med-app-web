import React from "react";
import { Box } from "@mui/material/";
import ProfileForm from "../components/ProfileForm";

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
      <ProfileForm />
    </Box>
  );
};

export default Profile;
