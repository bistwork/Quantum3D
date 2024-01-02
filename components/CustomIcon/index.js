import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function CustomIcon(props) {
  return <SvgIcon {...props}>{props.children}</SvgIcon>;
}
//usage
{
  /* <CustomIcon sx={{ fontSize: 14, marginLeft: 0.5, color: "lightBlue" }}>
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.9L5.9 11l1.41-1.41 4.24 4.24L16.1 7.1l1.41 1.41z" />
</CustomIcon>; */
}
