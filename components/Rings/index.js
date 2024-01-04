import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CircleContainer = styled("div")(({ size, color }) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: color,

  border: `1px solid rgba(255, 255, 255, 0.1);`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

const Avatar = styled("div")(({ position, avatarSrc }) => ({
  position: "absolute",
  width: "3em",
  height: "3em",
  borderRadius: "50%",
  //background: "grey",
  background: `url(${avatarSrc}) no-repeat center center / cover`,
  top: position.top,
  bottom: position.bottom,
  left: position.left,
  right: position.right,
}));

const Rings = () => {
  const circleColor = "transparent";

  return (
    <CircleContainer size="28em" color={circleColor}>
      <CircleContainer size="25em" color={circleColor}>
        <CircleContainer size="22em" color={circleColor}>
          <CircleContainer size="19em" color={circleColor}>
            <Avatar
              position={{ top: "-22%", right: "18%" }}
              avatarSrc="/avatar/1.jpg"
            />
            <Avatar
              position={{ bottom: "-4%", left: "1%" }}
              avatarSrc="/avatar/5.jpg"
            />
            <Avatar
              position={{ top: "10%", left: "-2%" }}
              avatarSrc="/avatar/2.jpg"
            />
            <Avatar
              position={{ bottom: "-29%", right: "21%" }}
              avatarSrc="/avatar/4.jpg"
            />
            <Avatar
              position={{ bottom: "40%", right: "-13%" }}
              avatarSrc="/avatar/3.jpg"
            />
            <Typography style={{ textAlign: "center" }} variant="h5" component="span" color="white" zIndex={10}>
              Welcome to{" "}
              <Typography variant="h5" component={"span"} color={"#3762ea"}>
                Oasis Patio Systems
              </Typography>
            </Typography>
          </CircleContainer>
        </CircleContainer>
      </CircleContainer>
    </CircleContainer>
  );
};

export default Rings;
