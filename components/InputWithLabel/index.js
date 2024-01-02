import { Grid, TextField, Typography } from "@mui/material";

export default function InputWithLabel({ labelTitle, ...props }) {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }} alignItems="center">
      <Grid item xs={12} sm={4} sx={{ textAlign: "left" }}>
        <Typography>{labelTitle}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField fullWidth {...props} />
      </Grid>
    </Grid>
  );
}
