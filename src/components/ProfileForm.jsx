import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@mui/material/";
import {
  getUser,
  updateUser,
  getDoctorAppointmentCategories,
  addDoctorAppointmentCategory,
  getAppointmentCategories,
} from "../firebase";
import Message from "./Message";

const ProfileForm = (props) => {
  const [doctorPhone, setDoctorPhone] = useState("");
  const [docAppointmentCategories, setDocAppointmentCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);
  const [newAppointmentCat, setNewAppointmentCat] = useState("");
  const [warningText, setWarningText] = useState("");
  const [open, setOpen] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const loadDoctor = () => {
      getUser(userID).then((doctor) => {
        setDoctorPhone(doctor.phone);
      });
      getDoctorAppointmentCategories(userID).then((appointments) => {
        setDocAppointmentCategories(appointments);
      });
      getAppointmentCategories().then((appointments) => {
        setActualCategories(appointments);
      });
    };
    loadDoctor();
  }, []);
  const onChangePhone = (e) => {
    setDoctorPhone(e.target.value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateUser(userID, doctorPhone);

    console.log("edit form send");
  };
  const handleNewAppointmentCat = (event) => {
    setNewAppointmentCat(event.target.value);
  };

  const addCategory = () => {
    console.log("hey" + newAppointmentCat);
    if (newAppointmentCat) {
      let newCat = actualCategories.find((cat) => {
        if (cat.name === newAppointmentCat) {
          console.log(cat.id);
          return cat;
        }
        return false;
      });
      console.log(newCat);
      let isExist = false;
      docAppointmentCategories.map((cat) => {
        if (cat.id === newCat.id) {
          isExist = true;
        }
        return false;
      });
      if (isExist) {
        console.log("this category exist, you can edit it");
        setOpen(true);
        setWarningText("This category exist, you can edit it.");
      } else {
        console.log("new cateogry added");
        addDoctorAppointmentCategory(userID, newCat.name, newCat.id, 0).then(
          () => {
            const newList = docAppointmentCategories.concat(newCat);
            setDocAppointmentCategories(newList);
          }
        );
      }
    } else {
      console.log("not category selected");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleEdit}
      noValidate
      sx={{
        mt: 1,
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone"
        name="phone"
        value={doctorPhone}
        onChange={onChangePhone}
        autoFocus
      />
      <List>
        <ListItem>
          <ListItemText> Nazwa </ListItemText>
          <ListItemText> Czas(min.) </ListItemText>
          <ListItemText> Cena(zł) </ListItemText>
        </ListItem>
        {docAppointmentCategories.map((appointment, i) => (
          <ListItem key={i}>
            <ListItemText> {appointment.name} </ListItemText>
            <TextField value={appointment.estimatedTime}> </TextField>
            <TextField value={appointment.price}> </TextField>
            <Button
              variant="contained"
              sx={{
                ml: 1,
              }}
            >
              -
            </Button>
          </ListItem>
        ))}
      </List>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="p" gutterBottom>
            New Appointment Category Name
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={newAppointmentCat}
            onChange={handleNewAppointmentCat}
            style={{ minWidth: 300, marginRight: "1rem" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {actualCategories.map((appointment, i) => (
              <MenuItem value={appointment.name} key={i}>
                {appointment.name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={addCategory}>
            +
          </Button>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        Edit
      </Button>

      <Message variant="warning" text={warningText} open={open}></Message>
    </Box>
  );
};

export default ProfileForm;
