import { Box, Typography } from "@mui/material";

export default function ImageBox({ imageSrc, description, onSelect }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        "&:hover img": {
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        },
        "&:hover p": {
          fontWeight: "bold",
        },
      }}
    >
      <img
        onClick={() => onSelect(description)}
        src={imageSrc}
        alt={description}
        style={{
          maxWidth: "50%",
          height: "auto",
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
      />
      <Typography component="p" fontFamily="var(--primary-font-family)">
        {description}
      </Typography>
    </Box>
  );
}
