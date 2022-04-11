import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material/";
import { Zoom, useMediaQuery, Hidden } from "@mui/material";
import { Link } from "react-router-dom";
import Social from "../components/Social";
import useClasses from "../styles/useClasses";
import homeStyles from "../styles/homeStyles";
import teddy_background from "../assets/images/teddy_bear_background.png";
import teddy from "../assets/images/teddy_bear_enhanced.png";

const Home = () => {
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => setShouldShow(true), []);
  const bigScreen = useMediaQuery("(min-width:700px)");
  const styles = useClasses(homeStyles);
  return (
    <Paper className={styles.section} id="about">
      {bigScreen && (
        <img
          className={styles.heroImage}
          src={teddy_background}
          alt="desktop teddy"
        />
      )}
      {!bigScreen && (
        <div>
          <div className={styles.filledBackground}></div>
          <img
            className={styles.mobileHeroImage}
            src={teddy}
            alt="mobile teddy"
          />
        </div>
      )}
      <div className={styles.overlay}></div>
      <Container className={styles.container} maxWidth="md">
        <Grid className={styles.content} container alignItems="center">
          <Hidden xsDown>
            <Grid item sx={{ mr: 4 }}>
              <Social direction="column" />
            </Grid>
          </Hidden>
          <Zoom in={shouldShow}>
            <Grid item sm={8}>
              <Typography component="h1" variant="h3">
                Welcome to med app
              </Typography>
              <Typography variant="h5" color="primary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
              </Typography>
              <Box my={2}>
                <Link to={"/signin"} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="primary">
                    Login!
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Zoom>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Home;
