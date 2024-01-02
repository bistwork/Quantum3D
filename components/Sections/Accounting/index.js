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

export default function Accounting(props) {
  const showSnackbar = useContext(SnackbarContext);
  const { user, updateAccounting } = useAuth();
  const accounting = user?.accounting || {};

  const fullNameInput = useFormInput(
    accounting.fullName || "",
    validations.fullName
  );
  const phoneInput = useFormInput(
    accounting.phone || "",
    validations.phone,
    formatters.phoneFormatter
  );
  const emailInput = useFormInput(accounting.email || "", validations.email);
  const taxExemptInput = useFormInput(accounting.taxExempt || "");

  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedAndValid, setHasChangedAndValid] = useState(false);
  const omitEmptyFields = (obj) =>
    omitBy(obj, (val) => val === "" || val === null || val === undefined);

  const formData = {
    fullName: fullNameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    taxExempt: taxExemptInput.value,
    //another fields
  };

  const checkForChanges = () => {
    const cleanedAccounting = omitEmptyFields(accounting);
    const cleanedFormData = omitEmptyFields(formData);

    const areFieldsValid =
      fullNameInput.isValid &&
      phoneInput.isValid &&
      emailInput.isValid &&
      taxExemptInput.isValid;

    const isChangedAndValid =
      !isEqual(cleanedAccounting, cleanedFormData) && areFieldsValid;
    const isChanged = !isEqual(cleanedAccounting, cleanedFormData);

    setHasChanged(isChanged);
    setHasChangedAndValid(isChangedAndValid);
  };

  const resetForm = () => {
    fullNameInput.resetValue();
    phoneInput.resetValue();
    emailInput.resetValue();
    taxExemptInput.resetValue();
    // Reset More field if existing
  };

  const handleUpdate = () => {
    updateUserData({ id: user.id, accounting: formData })
      .then((updatedUser) => {
        //TODO:need to update data with the response
        updateAccounting(formData);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });

    fullNameInput.setInitialValue(formData.fullName);
    phoneInput.setInitialValue(formData.phone);
    emailInput.setInitialValue(formData.email);
    taxExemptInput.setInitialValue(formData.taxExempt);
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
    taxExemptInput.value,
  ]);
  useEffect(() => {
    if (accounting && Object.keys(accounting).length > 0) {
      fullNameInput.setInitialValue(accounting.fullName);
      phoneInput.setInitialValue(accounting.phone);
      emailInput.setInitialValue(accounting.email);
      taxExemptInput.setInitialValue(accounting.taxExempt);
      //other fields
    }
  }, [accounting]);

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
              autoComplete="off"
              fullWidth
              helperText={<p>Tax Exempt ****</p>}
              placeholder="Enter Tax Exempt"
              isValid
              value={taxExemptInput.value}
              onChange={taxExemptInput.onChange}
              onBlur={taxExemptInput.onBlur}
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
