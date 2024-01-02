import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import styles from "./SideMenu.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth-context";

function DropDownMenu(props) {
  const { open } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!open && isExpanded) setIsExpanded(false);
  }, [open]);

  if (props.fixed) {
    return (
      <Link href={props.url}>
        <ListItem
          disablePadding
          className={styles.hoverItem}
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              maxHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              color: "#97979a",
            }}
          >
            <ListItemIcon
              className="side-menu-icon"
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "#97979a",
              }}
            >
              {props.icon}
            </ListItemIcon>
            <ListItemText
              primary={props.title}
              sx={{
                opacity: open ? 1 : 0,
                "& .MuiListItemText-primary": {
                  fontSize: "13px !important",
                  fontFamily: "var(--primary-font-family) !important",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  }
  return (
    <ListItem
      className={styles.hoverItem}
      disablePadding
      sx={{
        display: "block",
        "&:hover p, &:hover .MuiSvgIcon-root": {
          color: `${"white"} !important`,
        },
      }}
    >
      {open ? (
        <Accordion
          expanded={isExpanded}
          onChange={() => setIsExpanded((prev) => !prev)}
          className={styles.accordion}
        >
          <AccordionSummary
            className="side-menu-icon"
            expandIcon={<ExpandMoreIcon style={{ color: "#97979a" }} />}
            aria-controls="panel-content"
            id="panel-header"
            sx={{
              alignItems: "center",
              "& > .MuiAccordionSummary-content": {
                margin: "0px",
              },
              "& > .MuiAccordionSummary-content.Mui-expanded": {
                margin: "0px",
              },
              "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
                minHeight: "48px",
              },
            }}
          >
            {props.icon({
              marginRight: "0.83em",
              marginLeft: "0.26em",
              color: "#97979a",
            })}
            <Typography
              sx={{
                fontFamily: "var(--primary-font-family) !important",
                color: "#97979a",
                fontSize: "13px!important",
              }}
            >
              {props.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {props.items.map((item, i) => (
                <Link
                  target={item.addUserId ? "_blank" : "_self"}
                  href={
                    item.addUserId
                      ? `${item.url}/?dealerId=${
                          user?.id || "testingId"
                        }&model=${item.model}`
                      : item.url
                  }
                  key={i}
                >
                  <ListItemButton
                    className="side-menu-icon"
                    sx={{
                      color: "#97979a",
                      "&:hover .MuiTypography-root": {
                        color: `${"white"} !important`,
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "13px !important",
                          fontFamily: "var(--primary-font-family)!important",
                        },
                      }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: 2.5,
            color: "#97979a",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: "auto",
              justifyContent: "center",
              color: "#97979a",
              fontFamily: "var(--primary-font-family)!important",
            }}
          >
            {props.icon({ color: "#97979a", width: "17px", height: "17px" })}
          </ListItemIcon>
          <ListItemText sx={{ opacity: 0 }} />
        </ListItemButton>
      )}
    </ListItem>
  );
}

export default DropDownMenu;
