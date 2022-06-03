import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material/";

const Message = ({ variant, text, open, setOpen }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
    >
      <Alert severity={variant}>{text}</Alert>
    </Snackbar>
  );
};

Message.defaultPros = {
  variant: "error",
};

export default Message;
