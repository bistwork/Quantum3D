import { Grid } from "@mui/material";
import MainCard from "../../MainCard";
import Filters from "../CustomerSection/Filters";
import Table from "../CustomerSection/Table";
import { useState, useContext, useEffect } from "react";
import mockData from "../../../utils/mockData";
import { SnackbarContext } from "../../../context/snackBar-context";
import ProjectSelected from "./ProjectSelected";
import { useAuth } from "../../../context/auth-context";
import { fetchOrders } from "../../../api/projects";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const possibleStatus = ['Pending Approval','Payment Pending','Payment Received','In Production'];

const initialColumns = [
  { field: "comercialId", headerName: "Project ID", flex: 1.5 },
  { field: "orderDate", headerName: "Project Date", flex: 1.5 },
  {
    field: "deliveryDate",
    headerName: "Delivery Date",
    description: "This column has a value getter and is not sortable.",
    flex: 1.5,
  },
  { field: "customerName", headerName: "Customer Name", flex: 1.5 },
  { field: "customerLastname", headerName: "Customer Lastname", flex: 1.5 },
  {
    field: "retailAmount",
    headerName: "Retail Amount",
    flex: 1.5,
    valueGetter: (params) => `$ ${params.row.retailAmount} `,
  },
  {
    field: "projectStatus",
    headerName: "Project Status",
    flex: 2,
    renderCell: (params) => (
      <select
        value={params.row.status}
        onChange={()=>{}}
      >
      {possibleStatus.map((status) => (
        <option key={possibleStatus.indexOf(status)} value={possibleStatus.indexOf(status)}>
          {status}
        </option>
      ))}
    </select>)
      // `${possibleStatus[params.row.status]}`),
  },
  {
    field: 'selector',
    headerName: 'Action',
    flex: 1.5,
    sortable: false,
    renderCell: (params) => (
      <ul style={{display:"flex",gap:'0.5rem'}}><li><RemoveRedEyeOutlinedIcon/></li><li><CreateOutlinedIcon/></li><li><DeleteOutlineOutlinedIcon/></li></ul>
    ),
  },

];

export default function ProjectsSection() {
  const [projectList, setProjectList] = useState([]);
  const showSnackbar = useContext(SnackbarContext);
  const { user } = useAuth();
  const [projectSelected, setProjectSelected] = useState({});

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

  useEffect(() => {
    if (user) {
      try {
        fetchOrders(user.id)
          .then((data) => {
            console.log(data);
            setProjectList(data);
            setProjectSelected(data[0]);
          })
          .catch((error) => {
            console.log("Login error", error);
          });
      } catch (error) {
        console.error("try catch error", error);
      }
    }
    return () => {
      setProjectList([]);
    };
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
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
      {/* <Grid item xs={12} lg={4}>
        <Grid container spacing={2}></Grid>
        <MainCard>
          <ProjectSelected
            projectSelected={projectSelected}
            //onDelete={handleDeleteLead}
          />
        </MainCard>
      </Grid> */}
    </Grid>
  );
}
