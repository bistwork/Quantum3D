import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../../components/Navbar";
import SideMenu from "../../components/SideMenu";
import { Typography, useMediaQuery } from "@mui/material";
import mockData from "../../utils/mockData";
import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#181a20",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#181a20",
    },
  }),
}));

export default function MainWrapper(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();
  const [open, setOpen] = useState(!isMobile);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#f7f7f7";
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  return (
    <Box sx={{ display: "flex", width: "97vw" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, .06) 0px 2px 4px -1px;",
          borderBottom: "1px solid var(--border-color-translucent)",
          // width: "95.4%",
        }}
        open={open}
      >
        <Toolbar>
          <Navbar
            username={user?.fullName || "My Name"}
            onOpen={handleDrawerOpen}
            onClose={handleDrawerClose}
            open={open}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              router.push(`/home`);
            }}
          >
            <img
              style={{ width: "120px" }}
              src="/Pergalum_Color.webp"
              alt="Description"
            />
          </IconButton>
        </DrawerHeader>
        {open && (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              fontSize: "11px",
              color: "#97979a",
              fontWeight: "500",
              ml: 2,
              fontFamily: "var(--primary-font-family)!important",
            }}
          >
            MENU
          </Typography>
        )}
        {mockData.sideMenuData.map((item, index) => {
          const isAdmin = user?.role === "Admin";
          if (!isAdmin || (isAdmin && index !== 1 && index !== 2)) {
            return typeof item.items !== "undefined" ? (
                <SideMenu
                key={index}
                icon={item.icon}
                items={item.items}
                title={item.title}
                open={open}
              />
              ) : (
                <SideMenu
                icon={item.icon}
                title={item.title}
                key={index}
                url={item.url}
                fixed
                open={open}
                />
                );
              }
              })}
              </Drawer>
              
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          backgroundColor: "transparent",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
        }}
      >
        <div style={{ marginTop: "35px" }} />
        {props.children}
      </Box>
    </Box>
  );
}
