import React, { createContext, useState, useCallback } from "react";
import SnackBar from "../components/SnackBar";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    alertType: "success",
  });

  const openSnackbar = useCallback((message, alertType = "success") => {
    setSnackbarState({ open: true, message, alertType });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={openSnackbar}>
      {children}
      <SnackBar
        open={snackbarState.open}
        message={snackbarState.message}
        alertType={snackbarState.alertType}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};
