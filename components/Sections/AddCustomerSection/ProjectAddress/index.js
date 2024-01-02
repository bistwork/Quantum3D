import { Stack } from "@mui/material";
import TextField from "../../../TextField";
import useFormInput from "../../../../hooks/useFormInput";
import validations from "../../../../utils/validations";
import formatters from "../../../../utils/formatters";
import { useEffect } from "react";

export default function ProjectAddress({ data, onUpdate, onValidate }) {
  const address = useFormInput(
    data?.projectAddress?.address || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const city = useFormInput(
    data?.projectAddress?.city || "",
    null,
    formatters.capitalizeFirstLetter
  );
  const state = useFormInput(
    data?.projectAddress?.state || "",
    null,
    formatters.capitalizeFirstLetter
  );

  const zipcode = useFormInput(
    data?.projectAddress?.zipcode || "",
    null,
    formatters.numberOnlyFormatter
  );
  useEffect(() => {
    const isValid = address.value && city.value && state.value && zipcode.value;

    if (isValid) {
      onUpdate("projectAddress", {
        address: address.value,
        city: city.value,
        state: state.value,
        zipcode: zipcode.value,
      });
    }
    onValidate(isValid);
  }, [address.value, city.value, state.value, zipcode.value]);

  return (
    <Stack width="100%" spacing={1}>
      <TextField
        required
        type="text"
        placeholder="Address"
        name="Address"
        helperText={<p>Address</p>}
        value={address.value}
        // isValid={emailInput.isValid}
        onChange={address.onChange}
        isValid
        autoComplete="street-address"
      />
      <TextField
        required
        type="text"
        placeholder="City"
        name="City"
        helperText={<p>City</p>}
        value={city.value}
        // isValid={emailInput.isValid}
        onChange={city.onChange}
        isValid
        autoComplete="address-level2"
      />
      <TextField
        required
        type="text"
        placeholder="State"
        name="State"
        helperText={<p>State</p>}
        value={state.value}
        // isValid={emailInput.isValid}
        onChange={state.onChange}
        isValid
        autoComplete="address-level1"
      />
      <TextField
        required
        type="text"
        placeholder="Zipcode"
        name="Zipcode"
        helperText={<p>Zipcode</p>}
        value={zipcode.value}
        // isValid={emailInput.isValid}
        onChange={zipcode.onChange}
        isValid
        autoComplete="postal-code"
      />
    </Stack>
  );
}
