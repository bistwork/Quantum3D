import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLabels({ onChange, label, size, ...props }) {
  return (
    <FormControlLabel
      {...props}
      control={<Switch defaultChecked size={size} onChange={onChange} />}
      label={label}
    />
  );
}
