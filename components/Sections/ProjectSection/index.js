import { Grid } from "@mui/material";
import MainCard from "../../MainCard";
import Filters from "../CustomerSection/Filters";
import Table from "../CustomerSection/Table";
import { useState, useContext } from "react";
import mockData from "../../../utils/mockData";
import { SnackbarContext } from "../../../context/snackBar-context";
import ProjectSelected from "./ProjectSelected";

const initialColumns = [
  { field: "customerName", headerName: "Customer Name", flex: 1.5 },
  { field: "customerLastname", headerName: "Customer Lastname", flex: 1.5 },
  { field: "orderDate", headerName: "Order Date", flex: 1.5 },
  {
    field: "deliveryDate",
    headerName: "Delivery Date",
    description: "This column has a value getter and is not sortable.",
    flex: 2,
  },
  {
    field: "retailAmount",
    headerName: "Retail Amount",
    flex: 1.5,
    valueGetter: (params) => `$ ${params.row.retailAmount} `,
  },
];

export default function ProjectsSection() {
  const [projectList, setProjectList] = useState(mockData.projectsTable);
  const showSnackbar = useContext(SnackbarContext);
  const [projectSelected, setProjectSelected] = useState(
    mockData.projectsTable[0]
  );

  const handleLeadSelection = (projectSelected) => {
    setProjectSelected(projectSelected);
  };

  //   const handleDeleteLead = (id) => {
  //     const updatedLeadList = leadList.filter((lead) => lead.id !== id);

  //     setLeadList(updatedLeadList);

  //     if (updatedLeadList.length > 0 && updatedLeadList[0]) {
  //       setLeadSelected(updatedLeadList[0]);
  //     } else {
  //       setLeadSelected(null);
  //     }
  //     setTimeout(() => {
  //       showSnackbar("Lead successfully deleted!", "success");
  //     }, 500);
  //   };

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
                tableRows={projectList}
                initialColumns={initialColumns}
                showHeader
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}></Grid>
        <MainCard>
          <ProjectSelected
            projectSelected={projectSelected}
            //onDelete={handleDeleteLead}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
