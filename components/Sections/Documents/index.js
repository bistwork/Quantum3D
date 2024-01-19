import TextField from "../../TextField";
import { Box, Grid, Typography } from "@mui/material";
import UpdateCancel from "../UpdateCancel";
import useFormInput from "../../../hooks/useFormInputv2";
import validations from "../../../utils/validations";
import formatters from "../../../utils/formatters";
import { useAuth } from "../../../context/auth-context";
import { useState, useEffect, useContext } from "react";
import { isEqual, omitBy } from "lodash";
import { SnackbarContext } from "../../../context/snackBar-context";
import { updateUserData } from "../../../api/user";

export default function Documents(props) {
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
        <Box>
            <Typography
                fontWeight={300}
                padding={"1em"}
                fontSize={13}
                fontFamily={"var(--primary-font-family)!important"}
                noWrap
                textAlign={"center"}
            >On development!</Typography>
        </Box>
      </form>
    </Box>
  );
}
