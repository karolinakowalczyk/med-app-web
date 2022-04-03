import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid, IconButton, Link } from "@mui/material/";

const socialItems = [
  {
    icon: GitHubIcon,
    url: "",
    name: "github",
  },
  {
    icon: TwitterIcon,
    url: "",
    name: "twitter",
  },
  {
    icon: LinkedInIcon,
    url: "",
    name: "linkedin",
  },
];

export default function Social({ direction }) {
  return (
    <Grid container direction={direction || "row"} spacing={8}>
      {" "}
      {socialItems.map((item) => (
        <Grid item key={item.name}>
          <Link href={item.url}>
            <IconButton>
              <item.icon />
            </IconButton>{" "}
          </Link>{" "}
        </Grid>
      ))}{" "}
    </Grid>
  );
}
