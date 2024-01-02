import { Grid, Box } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import ProfileInfo from "../components/Sections/ProfileInfo";
import withAuth from "../hooks/authHOC";

function Profile(props) {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} xl={3}>
            <ProfileCard />
          </Grid>

          <Grid item xs={12} md={9} xl={9}>
            <ProfileInfo />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withAuth(Profile);
