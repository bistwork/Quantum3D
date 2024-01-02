import { Box, Typography } from "@mui/material";
import ImageBox from "../../../ImageBox";
import RegularButton from "../../../RegularButton";

export default function TypeOfProject({ onNext, onPrevious }) {
  const projects = [
    { src: "/Pergola.webp", desc: "Pergola Lattice" },
    { src: "/Sunrooms.webp", desc: "Pergola Solid Insulated " },
    { src: "/Freestanding-Gazebo.webp", desc: "Pergola Combination Cover" },
  ];

  return (
    <Box sx={{ textAlign: "center", mt: 7 }}>
      <Typography className="new-user-form-typo">
        What kind of project are you interested in?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {projects.map((project) => (
          <ImageBox
            key={project.desc}
            imageSrc={project.src}
            description={project.desc}
            onSelect={onNext}
          />
        ))}
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
        <RegularButton onClick={onPrevious}>Previous</RegularButton>
      </Box>
    </Box>
  );
}
