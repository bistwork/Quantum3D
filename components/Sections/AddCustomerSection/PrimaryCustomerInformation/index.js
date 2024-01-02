import { Stack } from "@mui/material";
import TextField from "../../../TextField";
import useFormInput from "../../../../hooks/useFormInput";
import validations from "../../../../utils/validations";
import formatters from "../../../../utils/formatters";
import { useEffect } from "react";

export default function PrimaryCustomerInformation({
  data,
  onUpdate,
  onValidate,
}) {
  const bussinesName = useFormInput(
    data?.primaryInfo?.bussinesName || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const firstName = useFormInput(
    data?.primaryInfo?.firstName || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const lastName = useFormInput(
    data?.primaryInfo?.lastName || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const email = useFormInput(data?.primaryInfo?.email || "");
  const primaryPhone = useFormInput(
    data?.primaryInfo?.primaryPhone || "",
    null,
    formatters.phoneFormatter
  );
  const additionalPhone = useFormInput(
    data?.primaryInfo?.additionalPhone || "",
    null,
    formatters.phoneFormatter
  );

  useEffect(() => {
    const isValid =
      bussinesName.value &&
      firstName.value &&
      lastName.value &&
      email.value &&
      primaryPhone.value;

    if (isValid) {
      onUpdate("primaryInfo", {
        bussinesName: bussinesName.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        primaryPhone: primaryPhone.value,
        additionalPhone: additionalPhone.value,
        status: data?.primaryInfo?.status,
      });
    }
    onValidate(isValid);
  }, [
    bussinesName.value,
    firstName.value,
    lastName.value,
    email.value,
    primaryPhone.value,
    additionalPhone.value,
  ]);

  return (
    <Stack width="100%" spacing={1}>
      <TextField
        required
        type="text"
        placeholder="Enter Bussines Name"
        name="Bussines Name"
        helperText={<p>Bussines Name</p>}
        value={bussinesName.value}
        // isValid={emailInput.isValid}
        onChange={bussinesName.onChange}
        isValid
        autoComplete="organization"
      />
      <TextField
        required
        type="text"
        placeholder="Enter First Name"
        name="First Name"
        helperText={<p>First Name</p>}
        value={firstName.value}
        // isValid={emailInput.isValid}
        onChange={firstName.onChange}
        isValid
        autoComplete="given-name"
      />
      <TextField
        required
        type="text"
        placeholder="Enter Last Name"
        name="Last Name"
        helperText={<p>Last Name</p>}
        value={lastName.value}
        // isValid={emailInput.isValid}
        onChange={lastName.onChange}
        isValid
        autoComplete="family-name"
      />
      <TextField
        required
        type="email"
        placeholder="Enter email address"
        name="email"
        helperText={<p>Email</p>}
        value={email.value}
        // isValid={emailInput.isValid}
        onChange={email.onChange}
        isValid
        autoComplete="email"
      />
      <TextField
        required
        type="text"
        placeholder="(123) 456-7890"
        name="Primary Number"
        helperText={<p>Primary Number</p>}
        value={primaryPhone.value}
        // isValid={emailInput.isValid}
        onChange={primaryPhone.onChange}
        isValid
        autoComplete="tel"
      />
      <TextField
        type="text"
        placeholder="(123) 456-7890"
        name="Additional Number"
        helperText={<p>Additional Number</p>}
        value={additionalPhone.value}
        // isValid={emailInput.isValid}
        onChange={additionalPhone.onChange}
        isValid
        autoComplete="tel"
      />
    </Stack>
  );
}
