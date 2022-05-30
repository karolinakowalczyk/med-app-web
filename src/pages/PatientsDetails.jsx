import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  IconButton,
  Button,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import { addPrescription, getPatient, getPrescriptions } from "../firebase";
import SaveIcon from "@mui/icons-material/Save";
import { getFormattedDate } from "../helpers/AppointmentsHelper";
import { PDFExport } from "@progress/kendo-react-pdf";

let medCount = 1;

const PatientsDetails = (props) => {
  let renderedList = null;

  const [prescriptionCode, setPrescriptionCode] = useState("");

  const [recommendations0, setRecommendations0] = useState("");
  const [medicine0, setMedicine0] = useState("");
  const [recommendations1, setRecommendations1] = useState("");
  const [medicine1, setMedicine1] = useState("");
  const [recommendations2, setRecommendations2] = useState("");
  const [medicine2, setMedicine2] = useState("");
  const [recommendations3, setRecommendations3] = useState("");
  const [medicine3, setMedicine3] = useState("");
  const [recommendations4, setRecommendations4] = useState("");
  const [medicine4, setMedicine4] = useState("");

  const recommendations = [
    { name: medicine0, description: recommendations0 },
    { name: medicine1, description: recommendations1 },
    { name: medicine2, description: recommendations2 },
    { name: medicine3, description: recommendations3 },
    { name: medicine4, description: recommendations4 },
  ];

  let { id } = useParams();
  const [patientName, setPatientName] = useState("");
  const pdfExportComponent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatient = () => {
      getPatient(id).then((patient) => {
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

  function addMedicineField() {
    if (medCount < 5) {
      document.getElementsByName("Item" + medCount)[0].style.display = "flex";
      medCount++;
    }
  }

  function removeMedicineField() {
    if (medCount > 0) {
      medCount--;
      document.getElementsByName("Item" + medCount)[0].style.display = "none";
    }
  }

  const onChangeMedicine0 = (e) => {
    const medicine = e.target.value;
    setMedicine0(medicine);
  };
  const onChangeMedicine1 = (e) => {
    const medicine = e.target.value;
    setMedicine1(medicine);
  };

  const onChangeMedicine2 = (e) => {
    const medicine = e.target.value;
    setMedicine2(medicine);
  };

  const onChangeMedicine3 = (e) => {
    const medicine = e.target.value;
    setMedicine3(medicine);
  };

  const onChangeMedicine4 = (e) => {
    const medicine = e.target.value;
    setMedicine4(medicine);
  };

  const onChangeRecommendations0 = (e) => {
    const recomandations = e.target.value;
    setRecommendations0(recomandations);
  };
  const onChangeRecommendations1 = (e) => {
    const recomandations = e.target.value;
    setRecommendations1(recomandations);
  };
  const onChangeRecommendations2 = (e) => {
    const recomandations = e.target.value;
    setRecommendations2(recomandations);
  };
  const onChangeRecommendations3 = (e) => {
    const recomandations = e.target.value;
    setRecommendations3(recomandations);
  };
  const onChangeRecommendations4 = (e) => {
    const recomandations = e.target.value;
    setRecommendations4(recomandations);
  };
  const onChangePrescriptionCode = (e) => {
    const prescriptionCode = e.target.value;
    setPrescriptionCode(prescriptionCode);
  };

  const saveRecommandations = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const saveChanges = () => {
    console.log(medCount);
    console.log(recommendations, recommendations.slice(0, medCount));
    addPrescription(
      id,
      getFormattedDate(new Date(Date.now())),
      localStorage.getItem("userID"),
      recommendations.slice(0, medCount),
      false,
      prescriptionCode
    );
    // navigate("/calendar", {
    //   replace: true,
    // });
    // window.location.reload(false);
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
      <PDFExport
        ref={pdfExportComponent}
        paperSize="A4"
        fileName="Prescription.pdf"
      >
        <Grid
          sx={{
            m: 4,
          }}
        >
          <div style={{ marginLeft: "1rem", marginRight: "1.5rem" }}>
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
          </div>
          <List ref={(listView) => (renderedList = listView)}>
            <ListItem>
              <div style={{ display: "flex", width: "99%" }}>
                <TextareaAutosize
                  aria-label="Medicine"
                  minRows={2}
                  placeholder="Medicine"
                  style={{ width: "18%", alignSelf: "left" }}
                  onChange={onChangeMedicine0}
                  value={medicine0}
                />
                <div style={{ width: "10%" }}></div>
                <TextareaAutosize
                  aria-label="Recommendations"
                  minRows={2}
                  placeholder="Recommendations for patient"
                  style={{ width: "75%", alignSelf: "right" }}
                  onChange={onChangeRecommendations0}
                  value={recommendations0}
                />
              </div>
            </ListItem>
            <ListItem>
              <div name={"Item1"} style={{ display: "none", width: "99%" }}>
                <TextareaAutosize
                  aria-label="Medicine"
                  minRows={2}
                  placeholder="Medicine"
                  style={{ width: "18%", alignSelf: "left" }}
                  onChange={onChangeMedicine1}
                  value={medicine1}
                />
                <div style={{ width: "10%" }}></div>
                <TextareaAutosize
                  aria-label="Recommendations"
                  minRows={2}
                  placeholder="Recommendations for patient"
                  style={{ width: "75%", alignSelf: "right" }}
                  onChange={onChangeRecommendations1}
                  value={recommendations1}
                />
              </div>
            </ListItem>
            <ListItem>
              <div name={"Item2"} style={{ display: "none", width: "99%" }}>
                <TextareaAutosize
                  aria-label="Medicine"
                  minRows={2}
                  placeholder="Medicine"
                  style={{ width: "18%", alignSelf: "left" }}
                  onChange={onChangeMedicine2}
                  value={medicine2}
                />
                <div style={{ width: "10%" }}></div>
                <TextareaAutosize
                  aria-label="Recommendations"
                  minRows={2}
                  placeholder="Recommendations for patient"
                  style={{ width: "75%", alignSelf: "right" }}
                  onChange={onChangeRecommendations2}
                  value={recommendations2}
                />
              </div>
            </ListItem>
            <ListItem>
              <div name={"Item3"} style={{ display: "none", width: "99%" }}>
                <TextareaAutosize
                  aria-label="Medicine"
                  minRows={2}
                  placeholder="Medicine"
                  style={{ width: "18%", alignSelf: "left" }}
                  onChange={onChangeMedicine3}
                  value={medicine3}
                />
                <div style={{ width: "10%" }}></div>
                <TextareaAutosize
                  aria-label="Recommendations"
                  minRows={2}
                  placeholder="Recommendations for patient"
                  style={{ width: "75%", alignSelf: "right" }}
                  onChange={onChangeRecommendations3}
                  value={recommendations3}
                />
              </div>
            </ListItem>
            <ListItem>
              <div name={"Item4"} style={{ display: "none", width: "99%" }}>
                <TextareaAutosize
                  aria-label="Medicine"
                  minRows={2}
                  placeholder="Medicine"
                  style={{ width: "18%", alignSelf: "left" }}
                  onChange={onChangeMedicine4}
                  value={medicine4}
                />
                <div style={{ width: "10%" }}></div>
                <TextareaAutosize
                  aria-label="Recommendations"
                  minRows={2}
                  placeholder="Recommendations for patient"
                  style={{ width: "75%", alignSelf: "right" }}
                  onChange={onChangeRecommendations4}
                  value={recommendations4}
                />
              </div>
            </ListItem>
          </List>
        </Grid>
      </PDFExport>
      <Grid container sx={{ mb: 8 }}>
        <Button
          variant="contained"
          onClick={addMedicineField}
          sx={{ display: "block", marginLeft: 0, marginRight: "auto" }}
        >
          +
        </Button>

        <Button
          variant="contained"
          onClick={removeMedicineField}
          sx={{ display: "block", marginLeft: "auto", marginRight: 0 }}
        >
          -
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Button type="submit" variant="contained" onClick={saveChanges}>
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
