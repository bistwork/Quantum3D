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
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import formatters from "@/utils/formatters";
import styles from "./ProjectSelected/ProjectSection.module.css";

const possibleStatus = ['Pending Approval','Payment Pending','Payment Received','In Production'];

const initialColumns = [
  { field: "comercialId", headerName: "Project ID", flex: 1.5 },
  { field: "orderDate", headerName: "Project Date", flex: 1.5, valueGetter: (params) => `${formatters.dateFormatter(params.row.orderDate)}`, },
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
    valueGetter: (params) => `$${parseFloat(params.row.retailAmount).toFixed(2)} `,
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
  },
  {
    field: 'selector',
    headerName: 'Action',
    flex: 2,
    sortable: false,
    renderCell: (params) => (
      <div className={styles.actionBlock}>
      <ul className={styles.projectList}><li className={styles.projectListItem}><a href={`/projects/project-overview?projectId=${params.row.id}`} className={styles.projectActionBtn}><RemoveRedEyeOutlinedIcon className={styles.eyeIcon}/></a></li><li className={styles.projectListItem}><a className={styles.projectActionBtn}><CreateOutlinedIcon className={styles.pencilIcon}/></a></li><li className={styles.projectListItem}><a className={styles.projectActionBtn}><InsertLinkIcon className={styles.urlIcon}/></a></li><li className={styles.projectListItem}><a className={styles.projectActionBtn}><DeleteOutlineOutlinedIcon className={styles.trashIcon}/></a></li></ul>
      </div>

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
      console.log(projectList);
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
                tableRows={user?projectList:mockData.projectList}
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
