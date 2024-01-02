import TextField from "../../TextField";
import { Box, Grid } from "@mui/material";
import UpdateCancel from "../UpdateCancel";
import useFormInput from "../../../hooks/useFormInputv2";
import validations from "../../../utils/validations";
import formatters from "../../../utils/formatters";
import { useAuth } from "../../../context/auth-context";
import { useState, useEffect, useContext } from "react";
import { isEqual, omitBy, omit } from "lodash";
import { SnackbarContext } from "../../../context/snackBar-context";
import { updateUserData } from "../../../api/user";

//this component has a logic that could be reusable for another components like accounting and shipping
//when ever the bussines logic get defined, apply hook

export default function GeneralInfo(props) {
  const showSnackbar = useContext(SnackbarContext);
  const { user, updateUser } = useAuth();
  const fullNameInput = useFormInput(
    user?.fullName || "",
    validations.fullName
  );
  const companyNameInput = useFormInput(user?.companyName || "");
  const phoneInput = useFormInput(
    user?.phone || "",
    validations.phone,
    formatters.phoneFormatter
  );
  const additionalPhoneInput = useFormInput(
    user?.additionalPhone || "",
    validations.phone,
    formatters.phoneFormatter
  );
  const urlInput = useFormInput(user?.url || "", validations.url);
  const positionInput = useFormInput(user?.position || "");
  const bussinesAddressInput = useFormInput(user?.bussinesAddress || "");
  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedAndValid, setHasChangedAndValid] = useState(false);
  const omitEmptyFields = (obj) =>
    omitBy(obj, (val) => val === "" || val === null || val === undefined);

  const formData = {
    fullName: fullNameInput.value,
    companyName: companyNameInput.value,
    phone: phoneInput.value,
    additionalPhone: additionalPhoneInput.value,
    url: urlInput.value,
    position: positionInput.value,
    bussinesAddress: bussinesAddressInput.value,
    //another fields
  };

  const checkForChanges = () => {
    let cleanedUser = omitEmptyFields(user);
    cleanedUser = omit(cleanedUser, [
      "accounting",
      "shipping",
      "email",
      "id",
      "zipCodes",
    ]); // Omit the accounting object

    const cleanedFormData = omitEmptyFields(formData);

    const areFieldsValid =
      fullNameInput.isValid &&
      companyNameInput.isValid &&
      phoneInput.isValid &&
      additionalPhoneInput.isValid &&
      urlInput.isValid &&
      positionInput.isValid &&
      bussinesAddressInput.isValid;

    const isChangedAndValid =
      !isEqual(cleanedUser, cleanedFormData) && areFieldsValid;
    const isChanged = !isEqual(cleanedUser, cleanedFormData);

    setHasChanged(isChanged);
    setHasChangedAndValid(isChangedAndValid);
  };

  const resetForm = () => {
    fullNameInput.resetValue();
    companyNameInput.resetValue();
    phoneInput.resetValue();
    additionalPhoneInput.resetValue();
    urlInput.resetValue();
    positionInput.resetValue();
    bussinesAddressInput.resetValue();
    // Reset More field if existing
  };

  const handleUpdate = () => {
    updateUserData({ id: user.id, ...formData })
      .then((updatedUser) => {
        //TODO:need to update data with the response
        updateUser(formData);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    fullNameInput.setInitialValue(formData.fullName);
    companyNameInput.setInitialValue(formData.companyName);
    phoneInput.setInitialValue(formData.phone);
    additionalPhoneInput.setInitialValue(formData.additionalPhone);
    urlInput.setInitialValue(formData.url);
    positionInput.setInitialValue(formData.position);
    bussinesAddressInput.setInitialValue(formData.bussinesAddress);
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
    companyNameInput.value,
    phoneInput.value,
    additionalPhoneInput.value,
    urlInput.value,
    positionInput.value,
    bussinesAddressInput.value,
  ]);
  useEffect(() => {
    if (user) {
      fullNameInput.setInitialValue(user.fullName);
      companyNameInput.setInitialValue(user.companyName);
      phoneInput.setInitialValue(user.phone);
      additionalPhoneInput.setInitialValue(user.additionalPhone);
      urlInput.setInitialValue(user.url);
      positionInput.setInitialValue(user.position);
      bussinesAddressInput.setInitialValue(user.bussinesAddress);
      //other fields
    }
  }, [user]);

  return (
    <Box sx={{ width: "100%", m: "auto", p: 2 }}>
      <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="name"
              type="text"
              fullWidth
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
              autoComplete="organization"
              type="text"
              fullWidth
              helperText={<p>Company Name</p>}
              placeholder="Enter Company Name"
              isValid
              value={companyNameInput.value}
              onChange={companyNameInput.onChange}
              onBlur={companyNameInput.onBlur}
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
              autoComplete="tel"
              type="tel"
              fullWidth
              helperText={<p>Additional Phone Number</p>}
              placeholder="(123) 456-7890"
              isValid={additionalPhoneInput.isValid}
              value={additionalPhoneInput.value}
              onChange={additionalPhoneInput.onChange}
              onBlur={additionalPhoneInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="url"
              type="text"
              fullWidth
              helperText={<p>Website(URL)</p>}
              placeholder="https://www.example.com"
              isValid={urlInput.isValid}
              value={urlInput.value}
              onChange={urlInput.onChange}
              onBlur={urlInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="organization-title"
              type="text"
              fullWidth
              helperText={<p>Position</p>}
              placeholder="Enter Position"
              isValid
              value={positionInput.value}
              onChange={positionInput.onChange}
              onBlur={positionInput.onBlur}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="street-address"
              type="text"
              fullWidth
              helperText={<p>Bussines Address</p>}
              placeholder="Enter Bussines Address"
              isValid
              value={bussinesAddressInput.value}
              onChange={bussinesAddressInput.onChange}
              onBlur={bussinesAddressInput.onBlur}
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
