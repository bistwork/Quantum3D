import { Box, Typography } from "@mui/material";
import ImageComponent from "../ImageComponent";

export default function NoNewNotifications(props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <ImageComponent
        padding="0"
        alt="No new notifications"
        src={"/NoNotifications.png"}
      ></ImageComponent>
      <Typography variant="h6" textAlign="center">
        You're all caught up!
      </Typography>
      <Typography mb={2} variant="body2" textAlign="center">
        No new notifications
      </Typography>
    </Box>
  );
}
