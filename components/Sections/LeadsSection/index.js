import { Grid } from "@mui/material";
import MainCard from "../../MainCard";
import Filters from "../CustomerSection/Filters";
import Table from "../CustomerSection/Table";
import { useState, useContext, useEffect } from "react";
import mockData from "../../../utils/mockData";
import { SnackbarContext } from "../../../context/snackBar-context";
import LeadSelected from "./LeadSelected";
import { useAuth } from "@/context/auth-context";
import { v4 as uuidv4 } from 'uuid';

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
  const [leadList, setLeadList] = useState([]);
  const [leads, setLeads] = useState([]);
  const showSnackbar = useContext(SnackbarContext);
  const [leadSelected, setLeadSelected] = useState(mockData.leadsTable[0]);
  const { user } = useAuth();

  const handleLeadSelection = (leadSelected) => {
    setLeadSelected(leadSelected);
  };

  useEffect(() => {
    // Fetch the existing leads when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("https://ymlgp7w2h2jl6fzyhim27yonry0ighas.lambda-url.us-west-2.on.aws",{method: 'GET',userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'});
        const data = await response.json();
        console.log(data)
        setLeads(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(user && leads.length>0){
      let dealerLeads = []
      console.log(leads)
      leads.map(item => {
        if(user.zipCodes.includes(item.projectLocation)){
          dealerLeads.push({
            'fullName':`${item.moreInfo.firstName} ${item.moreInfo.lastName}`,
            'email': item.moreInfo.email,
            'phoneNumber':item.moreInfo.phone,
            'zipCode':item.projectLocation,
            'id':uuidv4(),
            'pergolaModel':item.typeOfProject,
            'typeOfProperty':item.typeOfProperty,
            'address':`${item.projectAddress.streetAddress}, ${item.projectAddress.city}, ${item.projectAddress.state}`
        })
        }
    })
    setLeadList(dealerLeads)
  }
  },[leads])

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
                tableRows={leadList?leadList:mockData.leadsTable}
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
