import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLabels({ checked=true,onChange, label, size, ...props }) {
  return (
    <FormControlLabel
      {...props}
      control={<Switch size={size} onChange={onChange} />}
      label={label}
    />
  );
}
