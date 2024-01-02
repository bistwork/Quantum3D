import { Grid, Button } from "@mui/material";
import TextField from "../../../TextField";

function CustomFilterIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-funnel"
      viewBox="0 0 16 16"
    >
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
    </svg>
  );
}

export default function Filters({ placeholders }) {
  const handleFilter = () => {};

  return (
    <form onSubmit={handleFilter} style={{ width: "100%" }}>
      <Grid container spacing={2} pr={2} pl={2} pb={2}>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <TextField
            placeholder={
              placeholders?.firstInput || "Search customer, email etc..."
            }
            isValid
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={3}>
          <TextField
            placeholder={placeholders?.secondInput || "All Select"}
            isValid
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={3}>
          <TextField
            placeholder={placeholders?.thirdInput || "Select Date"}
            isValid
          />
        </Grid>
        <Grid item xs={12} md={4} lg={2} xl={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<CustomFilterIcon />}
            sx={{
              "& .MuiButton-startIcon": {
                marginRight: "6px",
                marginLeft: "-10px",
                marginBottom: "3px",
                width: "13px",
                height: "13px",
              },
              backgroundColor: "var(--tb-primary-bg-subtle)",
              fontSize: "13px",
              color: "var(--btn-color-blue)",
              fontFamily: "var(--primary-font-family)",
              height: "38px",
              marginTop: "2px",
              textTransform: "none",
              boxShadow: "none",
              "&.MuiButtonBase-root.MuiButton-root:hover": {
                backgroundColor: "var(--btn-color-blue)",
                color: "white",
                boxShadow: "none",
              },
            }}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
