import React, { useEffect, useState } from "react";
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
import { addPrescription, getPatient, getPrescriptions } from "../firebase";
import SaveIcon from "@mui/icons-material/Save";
import { getFormattedDate } from "../helpers/AppointmentsHelper";

const PatientsDetails = (props) => {
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [recommendations, setRecommendations] = useState("");
  let { id } = useParams();
  const [patientName, setPatientName] = useState("");

  // console.log("PARAMTER" + id);
  //get parient dont work
  useEffect(() => {
    const loadPatient = () => {
      getPatient(id).then((patient) => {
        //console.log(patient.name);
        setPatientName(patient.name);
      });
      // getPrescriptions(id, localStorage.getItem('userID')).then(result => {
      //   console.log(result)
      //   if(result.length > 0){
      //     setPrescriptionCode(result[0].number)
      //     setRecommendations(result[0].recomandations)
      //   }
      // })
    };
    loadPatient();
  }, []);

  const onChangeRecommendations = (e) => {
    const recomandations = e.target.value;
    setRecommendations(recomandations);
  };
  //console.log("PAT" + currentPatient);
  const onChangePrescriptionCode = (e) => {
    const prescriptionCode = e.target.value;
    setPrescriptionCode(prescriptionCode);
  };
  const saveRecommandations = () => {
    //todo
  };
  const saveChanges = () => {
    addPrescription(id, getFormattedDate(new Date(Date.now())), localStorage.getItem('userID'), {'recommendations': recommendations}, false, prescriptionCode)
  }
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
        Patient {patientName}
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
        onChange={onChangeRecommendations}
        value={recommendations}
      />

      <Grid container>
        <Grid item xs>
          <Button type="submit"
            variant="contained"
            onClick={saveChanges}
          >
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
