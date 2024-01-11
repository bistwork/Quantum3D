import React from "react";
import {
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Radio,
  Divider,
  Box,
  ButtonBase,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import calculations from "../../utils/calculations";

export default function NotificationItem({ item, handleUpdate, isLastItem }) {
  const toggleRadio = () => {
    handleUpdate(item.id);
  };

  return (
    <>
      <ButtonBase
        // onClick={toggleRadio}
        style={{ width: "100%", textAlign: "left" }}
        className="item-notification"
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.description}
            secondary={calculations.timeSince(item.createdAt)}
            primaryTypographyProps={{
              noWrap: false,
              style: {
                width: "calc(100% - 15px)",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              },
            }}
          />
          <Box sx={{ mr: -1, mt: -5 }}>
            <Radio checked={!item.read} />
          </Box>
        </ListItem>
      </ButtonBase>
      {!isLastItem && <Divider />}{" "}
    </>
  );
}
