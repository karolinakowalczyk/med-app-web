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
  IconButton,
} from "@mui/material/";
import {
  getUser,
  updateUser,
  getDoctorAppointmentCategories,
  addDoctorAppointmentCategory,
  getAppointmentCategories,
  updateDoctorCategories,
  removeDoctorAppointmentCategory,

} from "../firebase";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Message from "./Message";
import { doc } from "firebase/firestore/lite";

const ProfileForm = (props) => {
  const [doctorPhone, setDoctorPhone] = useState("");
  const [docAppointmentCategories, setDocAppointmentCategories] = useState([]);
  const [actualCategories, setActualCategories] = useState([]);
  const [newAppointmentCat, setNewAppointmentCat] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [open, setOpen] = useState(false);
  const [disableText, setDisableText] = useState(true);
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
  const onChangeNewPrice = (e) => {
    setNewPrice(e.target.value);
  };

  //TO DO call func
  const handleEdit = (e) => {
    e.preventDefault();
    updateUser(userID, doctorPhone);
    updateDoctorCategories(userID, docAppointmentCategories)
    setOpen(true);
    setWarningText("");
    setSuccessText("Edit form send.");
  };

  //TO DO implement func
  const deleteCategory = (i, e) => {
    removeDoctorAppointmentCategory(userID, docAppointmentCategories[i].id)
    const newlist = docAppointmentCategories.splice(i, 1)
    setDocAppointmentCategories(newlist)

  };

const updateTypes = (e, i, col) => {
    let items = [...docAppointmentCategories]
    let item = {...items[i]}
    item[col] = e.target.value
    items[i] = item
    setDocAppointmentCategories(items)
}

  const handleNewAppointmentCat = (event) => {
    setNewAppointmentCat(event.target.value);
  };
  const editOn = () => {
    setDisableText(false);
  };
  const editOff = () => {
    setDisableText(true);
  };

  const addCategory = () => {
    if (newPrice <= 0) {
      setOpen(true);
      setSuccessText("");
      setWarningText("Provide correct price of your service.");
    } else if (newAppointmentCat) {
      let newCat = actualCategories.find((cat) => {
        if (cat.name === newAppointmentCat) {
          return cat;
        }
        return false;
      });
      let isExist = false;
      docAppointmentCategories.map((cat) => {
        if (cat.id === newCat.id) {
          isExist = true;
        }
        return false;
      });
      if (isExist) {
        setOpen(true);
        setSuccessText("");
        setWarningText("This category exist, you can edit it.");
      } else {
        setOpen(true);
        setWarningText("");
        setSuccessText("New category added.");
        Object.assign(newCat, { price: newPrice });
        addDoctorAppointmentCategory(
          userID,
          30,
          newCat.id,
          newPrice
        ).then(() => {
          const newList = docAppointmentCategories.concat(newCat);
          setDocAppointmentCategories(newList);
        });
      }
    } else {
      setOpen(true);
      setSuccessText("");
      setWarningText("Select category.");
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
            <ListItemText style={{ minWidth: "30%" }}>
              {appointment.name}
            </ListItemText>
            <ListItemText>
              <TextField
                value={appointment.estimatedTime}
                disabled={disableText}
                onChange={event => updateTypes(event, i, 'estimatedTime')}
              ></TextField>
            </ListItemText>
            <ListItemText>
              <TextField
                value={appointment.price}
                disabled={disableText}
                onChange={event => updateTypes(event, i, 'price')}
              ></TextField>
            </ListItemText>
            <Button
              onClick={event => deleteCategory(i, event)}
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
        <Grid item sx={{ mt: 1 }}>
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
          <TextField
            style={{ marginRight: "1rem" }}
            type="number"
            required
            id="price"
            label="Price"
            name="price"
            autoComplete="price (PLN)"
            value={newPrice}
            onChange={onChangeNewPrice}
            autoFocus
          />
          <Button variant="contained" onClick={addCategory}>
            +
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton size="large" onClick={editOn}>
              <EditIcon />
            </IconButton>
            <IconButton size="large" onClick={editOff}>
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={disableText}
        sx={{
          mt: 3,
          mb: 2,
        }}
      >
        Edit
      </Button>

      {warningText && (
        <Message
          variant="warning"
          text={warningText}
          open={open}
          setOpen={setOpen}
        ></Message>
      )}
      {successText && (
        <Message
          variant="success"
          text={successText}
          open={open}
          setOpen={setOpen}
        ></Message>
      )}
    </Box>
  );
};

export default ProfileForm;
