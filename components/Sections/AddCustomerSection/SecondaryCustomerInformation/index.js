import { Stack } from "@mui/material";
import TextField from "../../../TextField";
import useFormInput from "../../../../hooks/useFormInput";
import validations from "../../../../utils/validations";
import formatters from "../../../../utils/formatters";
import { useEffect } from "react";

export default function SecondaryCustomerInformation({
  data,
  onUpdate,
  onValidate,
}) {
  const firstName = useFormInput(
    data?.secondaryInfo?.firstName || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const lastName = useFormInput(
    data?.secondaryInfo?.lastName || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const email = useFormInput(data?.secondaryInfo?.email || "");
  const primaryPhone = useFormInput(
    data?.secondaryInfo?.primaryPhone || "",
    null,
    formatters.phoneFormatter
  );

  useEffect(() => {
    onUpdate("secondaryInfo", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      primaryPhone: primaryPhone.value,
    });

    onValidate(true);
  }, [firstName.value, lastName.value, email.value, primaryPhone.value]);

  return (
    <Stack width="100%" spacing={1}>
      <TextField
        //required
        type="text"
        placeholder="Enter Secondary First Name"
        name="Secondary First Name"
        helperText={<p>Secondary First Name</p>}
        value={firstName.value}
        // isValid={emailInput.isValid}
        onChange={firstName.onChange}
        isValid
        autoComplete="given-name"
      />
      <TextField
        // required
        type="text"
        placeholder="Enter Secondary Last Name"
        name="Secondary Last Name"
        helperText={<p>Secondary Last Name</p>}
        value={lastName.value}
        // isValid={emailInput.isValid}
        onChange={lastName.onChange}
        isValid
        autoComplete="family-name"
      />
      <TextField
        // required
        type="email"
        placeholder="Enter Secondary Email address"
        name="Secondary email"
        helperText={<p>Secondary Email</p>}
        value={email.value}
        // isValid={emailInput.isValid}
        onChange={email.onChange}
        isValid
        autoComplete="email"
      />
      <TextField
        // required
        type="text"
        placeholder="(123) 456-7890"
        name="Secondary Primary Number"
        helperText={<p>Secondary Primary Number</p>}
        value={primaryPhone.value}
        // isValid={emailInput.isValid}
        onChange={primaryPhone.onChange}
        isValid
        autoComplete="tel"
      />
    </Stack>
  );
}
