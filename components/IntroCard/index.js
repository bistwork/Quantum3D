import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Rings from "../Rings";
import styles from "./IntroCard.module.css";
import Link from "next/link";

const IntroCard = () => {
  return (
    <Box className={styles.box}>
      <Grid container padding={"48px 0"}>
        <Grid item xs={12}>
          <Typography
            height={"27.3px"}
            className={styles.grid}
            marginBottom={"16px"}
            color={"#FFFFFF"}
            fontSize={"22.75px"}
            fontWeight={"600"}
            variant="h6"
            fontFamily={"'poppins', sans-serif"}
          >
            Join Our Team: Become a Dealer Today!
          </Typography>

          <Typography
            className={styles.grid}
            height={"19.5px"}
            color={"#FFFFFF"}
            fontWeight={"600"}
            fontSize={"13px"}
            fontFamily={"'poppins', sans-serif"}
            variant="p"
          >
            Want to join Oasis Patio Systems' dealer network? Join us for success and
            perks!
          </Typography>
        </Grid>
        <Grid
          className={styles.grid}
          marginBottom={"48px"}
          item
          xs={12}
          marginTop={"48px"}
        >
          <Rings />
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={styles.grid}
            height={"19.5px"}
            color={"#FFFFFF"}
            fontWeight={"600"}
            fontSize={"13px"}
            fontFamily={"'poppins', sans-serif"}
            variant="p"
          >
            © 2024 Oasis Patio Systems. Powered by{"\u00A0"}
            <Link
              className={styles.bistworkLink}
              href={"https://www.bistwork.com"}
              target="_blank"
            >
              Bistwork
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IntroCard;
