import MainCard from "../../MainCard";
import Tabs from "../../Tabs";
import mockData from "../../../utils/mockData";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./ProfileInfo.module.css";
import GeneralInfo from "../GeneralInfo";
import Shipping from "../Shipping";
import Accounting from "../Accounting";
import Security from "../SecuritySection";

const DEFAULT_SECTION = "General Information";

const SECTION_COMPONENTS = {
  [DEFAULT_SECTION]: GeneralInfo,
  Accounting: Accounting,
  Security: Security,
  Shipping: Shipping,
};

export default function ProfileInfo(props) {
  const [section, setSection] = useState(DEFAULT_SECTION);

  const SelectedComponent = SECTION_COMPONENTS[section];

  const handleOnChange = (data) => {
    //console.log("onChange", data);
  };

  return (
    <>
      <Tabs onChange={setSection} data={mockData.tabProfileInfo} />
      <MainCard>
        <Box sx={{ padding: "1em 1em 0 1em" }}>
          <Typography className={styles.mainLabel}>{section}</Typography>
          <SelectedComponent onChange={handleOnChange} />
        </Box>
      </MainCard>
    </>
  );
}
