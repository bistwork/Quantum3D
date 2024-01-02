import TextField from "../../TextField";
import { Box, Grid } from "@mui/material";
import UpdateCancel from "../UpdateCancel";
import useFormInput from "../../../hooks/useFormInputv2";
import validations from "../../../utils/validations";
import formatters from "../../../utils/formatters";
import { useAuth } from "../../../context/auth-context";
import { useState, useEffect, useContext } from "react";
import { isEqual, omitBy } from "lodash";
import { SnackbarContext } from "../../../context/snackBar-context";
import { updateUserData } from "../../../api/user";

export default function Shipping(props) {
  const showSnackbar = useContext(SnackbarContext);
  const { user, updateShipping } = useAuth();
  const shipping = user?.shipping || {};

  const fullNameInput = useFormInput(
    shipping.fullName || "",
    validations.fullName
  );
  const phoneInput = useFormInput(
    shipping.phone || "",
    validations.phone,
    formatters.phoneFormatter
  );
  const emailInput = useFormInput(shipping.email || "", validations.email);
  const distanceInput = useFormInput(shipping.distance || "");

  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedAndValid, setHasChangedAndValid] = useState(false);
  const omitEmptyFields = (obj) =>
    omitBy(obj, (val) => val === "" || val === null || val === undefined);

  const formData = {
    fullName: fullNameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    distance: distanceInput.value,
    //another fields
  };

  const checkForChanges = () => {
    const cleanedShipping = omitEmptyFields(shipping);
    const cleanedFormData = omitEmptyFields(formData);

    const areFieldsValid =
      fullNameInput.isValid &&
      phoneInput.isValid &&
      emailInput.isValid &&
      distanceInput.isValid;

    const isChangedAndValid =
      !isEqual(cleanedShipping, cleanedFormData) && areFieldsValid;
    const isChanged = !isEqual(cleanedShipping, cleanedFormData);

    setHasChanged(isChanged);
    setHasChangedAndValid(isChangedAndValid);
  };

  const resetForm = () => {
    fullNameInput.resetValue();
    phoneInput.resetValue();
    emailInput.resetValue();
    distanceInput.resetValue();
    // Reset More field if existing
  };
  const handleUpdate = () => {
    updateUserData({ id: user.id, shipping: formData })
      .then((updatedUser) => {
        //TODO:need to update data with the response
        updateShipping(formData);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });

    fullNameInput.setInitialValue(formData.fullName);
    phoneInput.setInitialValue(formData.phone);
    emailInput.setInitialValue(formData.email);
    distanceInput.setInitialValue(formData.taxExempt);
    // other fields
    showSnackbar("Your profile has been Updated!", "success");
    resetForm();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (hasChangedAndValid) {
      handleUpdate();
    }
  };

  useEffect(() => {
    checkForChanges();
  }, [
    fullNameInput.value,
    phoneInput.value,
    emailInput.value,
    distanceInput.value,
  ]);
  useEffect(() => {
    if (shipping && Object.keys(shipping).length > 0) {
      fullNameInput.setInitialValue(shipping.fullName);
      phoneInput.setInitialValue(shipping.phone);
      emailInput.setInitialValue(shipping.email);
      distanceInput.setInitialValue(shipping.distance);
      //other fields
    }
  }, [shipping]);

  return (
    <Box sx={{ width: "100%", m: "auto", p: 2 }}>
      <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="name"
              fullWidth
              type="text"
              helperText={<p>Full Name</p>}
              placeholder="Enter Full Name"
              isValid={fullNameInput.isValid}
              value={fullNameInput.value}
              onChange={fullNameInput.onChange}
              onBlur={fullNameInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="email"
              tooltipText="Enter a valid Email"
              fullWidth
              type="email"
              helperText={<p>Billing Email</p>}
              placeholder="Enter Billing Email"
              isValid={emailInput.isValid}
              value={emailInput.value}
              onChange={emailInput.onChange}
              onBlur={emailInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="tel"
              type="tel"
              fullWidth
              helperText={<p>Phone Number</p>}
              placeholder="(123) 456-7890"
              isValid={phoneInput.isValid}
              value={phoneInput.value}
              onChange={phoneInput.onChange}
              onBlur={phoneInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="off"
              fullWidth
              type="text"
              helperText={<p>Distance</p>}
              placeholder="Enter Distance"
              isValid
              value={distanceInput.value}
              onChange={distanceInput.onChange}
              onBlur={distanceInput.onBlur}
            />
          </Grid>
        </Grid>
        <UpdateCancel
          hasChanged={hasChanged}
          hasChangedAndValid={hasChangedAndValid}
          onReset={resetForm}
        />
      </form>
    </Box>
  );
}
