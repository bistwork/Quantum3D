import React from "react";
import { Box, Grid } from "@mui/material";
import IntroCard from "../IntroCard";

const ResponsiveBoxes = (props) => {
  return (
    <Grid maxWidth={"1200px"} container marginTop={"3em"}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IntroCard />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            height: "100%",
            width: "100%",
            padding: "3em 0",
          }}
        >
          {props.children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResponsiveBoxes;
