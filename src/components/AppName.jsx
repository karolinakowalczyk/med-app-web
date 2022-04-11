import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const AppName = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          component="div"
          color="secondary"
          sx={{
            ":hover": {
              color: "#fff",
              transitionDuration: "1s",
            },
          }}
        >
          Med App
        </Typography>
      </Link>
    </Box>
  );
};

export default AppName;
