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
import { Link, useNavigate } from "react-router-dom";
import { signUpEmail } from "../firebase"

const Register = () => {
  const navigate = useNavigate()
  const loginRedirect = () => {
    navigate("/login", {replace: true})
  }
  
  const loginError = () => {
  
  }

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [fname, setFname] = React.useState("")
  const [lname, setLname] = React.useState("")

  const onChangeEmail = (e) => {
    const username = e.target.value;
    setEmail(username);
    
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }

  const onChangeFname = (e) => {
    const fname = e.target.value;
    setFname(fname);
  }

  const onChangeLname = (e) => {
    const lname = e.target.value;
    setLname(lname);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpEmail(email, password).then(result => {
      if(result.errorCode===undefined){
          loginRedirect()
      }
      else{
          loginError()
      }
    })
    console.log("register form send");
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
          boxShadow: 1,
          p: 1,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fname}
                onChange={onChangeFname}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lname}
                onChange={onChangeLname}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onChangePassword}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/signin"}>
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
