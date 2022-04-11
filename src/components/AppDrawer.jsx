import React from "react";
import { Box, Drawer, Toolbar } from "@mui/material";

import MainDrawer from "./DrawerContent";

const AppDrawer = (appProps) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: appProps.width }, flexShrink: { sm: 0 } }}
    >
      <Toolbar />
      <Drawer
        variant="temporary"
        open={appProps.mobileOpen}
        onClose={appProps.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: appProps.drawerWidth,
          },
        }}
      >
        {<MainDrawer />}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: appProps.drawerWidth,
          },
        }}
        open
      >
        {<MainDrawer />}
      </Drawer>
    </Box>
  );
};

export default AppDrawer;
