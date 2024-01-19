import TextField from "../../TextField";
import { Box, Grid,Button } from "@mui/material";
import UpdateCancel from "../UpdateCancel";
import useFormInput from "../../../hooks/useFormInputv2";
import validations from "../../../utils/validations";
import formatters from "../../../utils/formatters";
import { useAuth } from "../../../context/auth-context";
import { useState, useEffect, useContext } from "react";
import { isEqual, omitBy } from "lodash";
import { SnackbarContext } from "../../../context/snackBar-context";
import { updateUserData } from "../../../api/user";

export default function Zipcodes(props) {
  const showSnackbar = useContext(SnackbarContext);
  const [dealerZipCodes,setDealerZipCodes] = useState([])
  const { user, updateZipcodes } = useAuth();
  const zipcodes = user?.zipCodes || [];

  useEffect(() => {
    if(dealerZipCodes.length<1){
        setDealerZipCodes(zipcodes);
    }
  },[zipcodes])

  const mainZipCodeInput = useFormInput(
    dealerZipCodes[0] || "",
    validations.isValidUSZipCode
  );

  const formData = {
    zipcode: mainZipCodeInput.value,
    //another fields
  };
  
  const [hasChanged, setHasChanged] = useState(false);
  const [hasChangedAndValid, setHasChangedAndValid] = useState(false);
  const omitEmptyFields = (obj) =>
    omitBy(obj, (val) => val === "" || val === null || val === undefined);

  const checkForChanges = () => {
    const cleanedShipping = omitEmptyFields(dealerZipCodes);
    const cleanedFormData = omitEmptyFields(formData);

    const areFieldsValid =
      mainZipCodeInput.isValid

    const isChangedAndValid =
      !isEqual(cleanedShipping, cleanedFormData) && areFieldsValid;
    const isChanged = !isEqual(cleanedShipping, cleanedFormData);

    setHasChanged(isChanged);
    setHasChangedAndValid(isChangedAndValid);
  };

  const resetForm = () => {
    mainZipCodeInput.resetValue();
    // Reset More field if existing
  };
  const handleUpdate = () => {
    updateUserData({ id: user.id, zipCodes: dealerZipCodes })
      .then((updatedUser) => {
        //TODO:need to update data with the response
        updateZipcodes(dealerZipCodes);
        console.log(user)
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });

    mainZipCodeInput.setInitialValue(formData.zipcode);
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
    mainZipCodeInput.value,

  ]);
  useEffect(() => {
    if ( zipcodes && zipcodes.length > 0) {
      mainZipCodeInput.setInitialValue(zipcodes[0]);
      //other fields
    }
  }, [zipcodes]);

  const handleZipCodeChange = (index) => (value) => {
    const newZipCodes = [...dealerZipCodes];
    newZipCodes[index] = value;
    setDealerZipCodes(newZipCodes);
  };

  return (
    <Box sx={{ width: "100%", m: "auto", p: 2 }}>
      <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2} direction={"column"}>

            {dealerZipCodes.map((zipCode, index) => (
                <>
                <Grid key={index} item xs={3} sm={3}>
                    <TextField
                    key={zipCode}
                    fullWidth
                    disabled={index === 0}
                    type="text"
                    helperText={<p>{index===0?"Main Zipcode":"Secondary Zipcode"}</p>}
                    placeholder="ex. 32003 "
                    error={!validations.isValidUSZipCode(zipCode)}
                    isValid
                    value={zipCode}
                    // onBlur={(e) => handleZipCodeChange(index)(e.target.value)}
                    onChange={(e) => handleZipCodeChange(index)(e.target.value)}
                    />
                </Grid>
                </>
            ))}
            <Grid item xs={3} sm={3}>
                <Button className="update-btn"
                    style={{
                    backgroundColor: "var(--btn-color-blue)",
                    color: "white",
                    textTransform:"none",
                    fontSize:"13px",
                    fontFamily: "var(--primary-font-family)",
                    }}onClick={(event)=>{
                    event.preventDefault()
                    setDealerZipCodes([...dealerZipCodes,""])
                }}>Add Zip Code</Button>
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
