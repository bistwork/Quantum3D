import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";

export default function PasswordVisibility(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    if (props.onChangeType) props.onChangeType(!showPassword);
    setShowPassword((show) => !show);
  };

  const style = { width: "14px", height: "14px" };

  return (
    <InputAdornment position="end">
      <IconButton
        sx={{ backgroundColor: "transparent" }}
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={togglePasswordVisibility}
        edge="end"
      >
        {showPassword ? (
          <VisibilityOff sx={style} />
        ) : (
          <Visibility sx={style} />
        )}
      </IconButton>
    </InputAdornment>
  );
}
