import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function MyTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(props.data[newValue]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#1e1a22",
          },
          "& .MuiTab-textColorSecondary.Mui-selected": {
            color: "#1e1a22",
          },
          "& .MuiTab-root": {
            fontFamily: "var(--primary-font-family)",
            fontSize: "13px",
            textTransform: "none",
          },
        }}
      >
        {props.data.map((item, index) => (
          <Tab value={index} key={index} label={item} />
        ))}
      </Tabs>
    </Box>
  );
}
