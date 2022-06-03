import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material/";

const Message = ({ variant, text, open }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000}>
      <Alert severity={variant}>{text}</Alert>
    </Snackbar>
  );
};

Message.defaultPros = {
  variant: "error",
};

export default Message;
