import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    //TO DO
    console.log("login form send");
  };

  const signInWithFb = () => {
    //TO DO
    console.log("signInWithFb clicked");
  };

  const signInWithGoogle = () => {
    //TO DO
    console.log("signInWithGoogle clicked");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs>
            <Button
              sx={{
                bgcolor: "#3C589C",
                ":hover": {
                  color: "black",
                  transitionDuration: "1s",
                },
              }}
              color="white"
              onClick={signInWithFb}
            >
              Sign in with Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                bgcolor: "#DF4B3B",
                ":hover": {
                  color: "black",
                  transitionDuration: "1s",
                },
              }}
              color="white"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/forgot-password"}>
                <Typography variant="body2">Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"}>
                <Typography variant="body2">
                  Don't have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
