import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { getPatient } from "../firebase";
import SaveIcon from "@mui/icons-material/Save";

const PatientsDetails = (props) => {
  const [prescriptionCode, setPrescriptionCode] = useState("");
  let { id } = useParams();
  console.log("PARAMTER" + id);
  //get parient dont work
  let currentPatient = getPatient("iDIhspVovGeQUPqg2kleDXf2oe22");
  console.log("PAT" + currentPatient.name);
  const onChangePrescriptionCode = (e) => {
    const prescriptionCode = e.target.value;
    setPrescriptionCode(prescriptionCode);
  };
  const saveRecommandations = () => {
    //TO DO
    console.log("recomandations saved!");
  };
  return (
    <Box
      component="main"
      sx={{
        ml: {
          sm: `${props.drawerWidth}px`,
        },
        p: 3,
      }}
    >
      <Typography component="h1" variant="h5">
        Patient XYZ
      </Typography>
      <TextField
        margin="normal"
        type="number"
        required
        fullWidth
        id="prescriptionCode"
        label="Prescription Code"
        name="prescriptionCode"
        autoComplete="prescription code"
        value={prescriptionCode}
        onChange={onChangePrescriptionCode}
        autoFocus
      />
      <TextareaAutosize
        aria-label="Recommendations"
        minRows={10}
        placeholder="Recommendations for patient"
        style={{ width: "99.3%" }}
      />

      <Grid container>
        <Grid item xs>
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={saveRecommandations}
          >
            <SaveIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientsDetails;