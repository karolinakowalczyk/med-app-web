import React from "react";
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";

import { Link } from "react-router-dom";

const drawerItems = [
  {
    id: 1,
    icon: CalendarMonthIcon,
    link: "/calendar",
    name: "Calendar",
  },
  {
    id: 2,
    icon: ListAltIcon,
    link: "/patients-table",
    name: "Patient's table",
  },
  {
    id: 3,
    icon: PersonIcon,
    link: "/account",
    name: "Your account",
  },
];

const DrawerContent = (props) => {
  return (
    <div>
      <Toolbar />
      <List>
        {drawerItems.map((item) => (
          <Link to={item.link} style={{ textDecoration: "none" }} key={item.id}>
            <ListItem button>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText secondary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;
