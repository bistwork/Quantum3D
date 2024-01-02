import React from "react";
import styles from "./ProfileCard.module.css";
import {
  Card,
  Badge,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { useAuth } from "../../context/auth-context";
import MainCard from "../MainCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProgressBar from "../ProgressBar";
import calculations from "../../utils/calculations";

function CustomCameraIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="black"
      className="bi bi-camera"
      viewBox="0 0 16 16"
    >
      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
    </svg>
  );
}

export default function FacebookCard() {
  const { user } = useAuth();

  return (
    <MainCard>
      <Card className={styles.card}>
        <CardMedia className={styles.media} image="/BG-Card.jpg" />
        <Badge
          className={styles.avatar}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: (theme) =>
                  `${theme.palette.grey[200]} !important`,
              }}
            >
              <CustomCameraIcon />
            </Avatar>
          }
        >
          <Avatar
            alt="Profile Pic"
            src="/avatar/6.jpg"
            className={styles.avatar}
            sx={{
              borderWidth: 3, // Puedes ajustar este valor según el grosor del borde que desees
              borderColor: "white", // Puedes cambiar esto al color de borde que desees
              borderStyle: "solid",
            }}
          ></Avatar>
        </Badge>
        <CardContent className={styles.content}>
          <div className={styles.nameWrapper}>
            <Typography
              noWrap
              maxWidth={"10em"}
              variant="h6"
              component="h2"
              fontFamily={"var(--primary-font-family)"}
              fontSize={"16.25px"}
            >
              {user?.fullName || "My name"}
            </Typography>
            <VerifiedIcon sx={{ fontSize: 14, color: "#439eae", ml: 1 }} />
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            fontFamily={"var(--primary-font-family)"}
            fontSize={"13px"}
          >
            {user?.position || "Web Developer"}
          </Typography>
        </CardContent>
      </Card>
      <Divider variant="middle" />
      <Box padding={2}>
        <ProgressBar percent={calculations.calculatePercentageFilled(user)} />
      </Box>
    </MainCard>
  );
}
