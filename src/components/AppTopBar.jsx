import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const AppTopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          <Link to={"/login"}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="white"
            >
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppTopBar;
