import { Grid, Typography } from "@mui/material";
import React from "react";

export default function FieldAndValue({
  fieldsAndValues,
  fieldMappings = {},
  order,
  ...props
}) {
  const fieldsAndValuesWithoutId = { ...fieldsAndValues };
  delete fieldsAndValuesWithoutId.id;

  function formatValue(field, value) {
    if (field === "retailAmount") {
      return `$${value}`;
    }
    return value;
  }

  return (
    <Grid container {...props}>
      {order.map((field) => (
        <React.Fragment key={field}>
          <Grid item xs={5}>
            <Typography
              fontWeight={600}
              fontSize={13}
              fontFamily={"var(--primary-font-family)!important"}
              noWrap
            >
              {fieldMappings[field] || field}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              fontSize={13}
              noWrap
              fontFamily={"var(--primary-font-family)!important"}
            >
              {formatValue(field, fieldsAndValuesWithoutId[field]) || "N/A"}
            </Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}
