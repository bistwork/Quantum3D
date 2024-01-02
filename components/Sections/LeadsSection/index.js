import { Grid } from "@mui/material";
import MainCard from "../../MainCard";
import Filters from "../CustomerSection/Filters";
import Table from "../CustomerSection/Table";
import { useState, useContext } from "react";
import mockData from "../../../utils/mockData";
import { SnackbarContext } from "../../../context/snackBar-context";
import LeadSelected from "./LeadSelected";

const initialColumns = [
  { field: "fullName", headerName: "Full Name", flex: 1.5 },
  { field: "email", headerName: "Email", flex: 2.5 },
  { field: "phoneNumber", headerName: "Phone Number", flex: 1.5 },
  {
    field: "zipCode",
    headerName: "Zip Code",
    description: "This column has a value getter and is not sortable.",
    flex: 1,
  },
  {
    field: "pergolaModel",
    headerName: "Pergola Model",

    flex: 1.5,
  },
];

export default function LeadsSection() {
  const [leadList, setLeadList] = useState(mockData.leadsTable);
  const showSnackbar = useContext(SnackbarContext);
  const [leadSelected, setLeadSelected] = useState(mockData.leadsTable[0]);

  const handleLeadSelection = (leadSelected) => {
    setLeadSelected(leadSelected);
  };

  const handleDeleteLead = (id) => {
    const updatedLeadList = leadList.filter((lead) => lead.id !== id);

    setLeadList(updatedLeadList);

    if (updatedLeadList.length > 0 && updatedLeadList[0]) {
      setLeadSelected(updatedLeadList[0]);
    } else {
      setLeadSelected(null);
    }
    setTimeout(() => {
      showSnackbar("Lead successfully deleted!", "success");
    }, 500);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Filters
                placeholders={{ firstInput: "Search leads, email,etc..." }}
              />
            </MainCard>
          </Grid>
          <Grid item xs={12} mb={2}>
            <MainCard>
              <Table
                onSelect={handleLeadSelection}
                tableRows={leadList}
                initialColumns={initialColumns}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}></Grid>
        <MainCard>
          <LeadSelected
            leadSelected={leadSelected}
            onDelete={handleDeleteLead}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
