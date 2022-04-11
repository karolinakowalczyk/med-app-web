import React, { useState } from "react";
import { Box, Toolbar, AppBar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";

import AppDrawer from "./AppDrawer";

import AppName from "./AppName";

const AppTopBar = (props) => {
  //change when log in
  const [isAuth, setIsAuth] = useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    console.log("p " + props.drawerWidth);
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!isAuth && (
        <AppBar position="fixed">
          <Toolbar>
            <AppName />
            <Link to={"/signin"}>
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
      )}
      {isAuth && (
        <div>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${props.drawerWidth}px)` },
              ml: { sm: `${props.drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <AppName />
              <Link to={"/signin"}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="white"
                >
                  <LogoutIcon />
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
          <AppDrawer
            drawerWidth={props.drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </div>
      )}
    </Box>
  );
};

export default AppTopBar;
