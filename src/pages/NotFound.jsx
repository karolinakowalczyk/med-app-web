import React from "react";
import { Container } from "@mui/material/";
import ErrorMessage from "../components/ErrorMessage";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: "1rem" }}>
      <ErrorMessage message="Not Found"></ErrorMessage>
    </Container>
  );
};

export default NotFound;
