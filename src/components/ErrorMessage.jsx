import React from "react";
import { Alert } from "@mui/material/";

const ErrorMessage = (props) => {
  return (
    <div>
      <Alert severity="error">{props.message}</Alert>
    </div>
  );
};

export default ErrorMessage;
