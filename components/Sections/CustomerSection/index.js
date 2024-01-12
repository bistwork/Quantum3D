import { Grid } from "@mui/material";
import MainCard from "../../MainCard";
import Filters from "./Filters";
import Table from "./Table";
import CustomerSelected from "./CustomerSelected";
import { useState, useContext, useEffect } from "react";
import { SnackbarContext } from "../../../context/snackBar-context";
import DataContext from "../../../context/customers-context";
import { fetchCustomers } from "../../../api/customers";
import { useAuth } from "../../../context/auth-context";

export default function CustomerSection() {
  const { data, setAllCustomers } = useContext(DataContext);
  // const [data, setData] = useState([]);
  const showSnackbar = useContext(SnackbarContext);
  const [customerSelected, setCustomerSelected] = useState({});
  const { user } = useAuth();
  const handleCustomerSelection = (customerSelected) => {
    setCustomerSelected(customerSelected);
  };

  useEffect(() => {
    if (user) {
      try {
        fetchCustomers(user.id)
          .then((data) => {
            // console.log(data);
            setAllCustomers(data);
            setCustomerSelected(data[0]);
          })
          .catch((error) => {
            console.log("Login error", error);
          });
      } catch (error) {
        console.error("try catch error", error);
      }
    }
    return () => {
      setAllCustomers([]);
    };
  }, []);

  useEffect(() => {
    setCustomerSelected((prev) => {
      return data.find((customer) => customer.id === prev?.id);
    });
  }, [data]);

  // const handleDeleteCustomer = (id) => {
  //   const updatedCustomerList = customerList.filter(
  //     (customer) => customer.id !== id
  //   );

  //   setCustomerList(updatedCustomerList);

  //   if (updatedCustomerList.length > 0 && updatedCustomerList[0]) {
  //     setCustomerSelected(updatedCustomerList[0]);
  //   } else {
  //     setCustomerSelected(null);
  //   }
  //   setTimeout(() => {
  //     showSnackbar("User successfully deleted!", "success");
  //   }, 500);
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Filters />
            </MainCard>
          </Grid>
          <Grid item xs={12} mb={2}>
            <MainCard>
              <Table onSelect={handleCustomerSelection} tableRows={data} />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}></Grid>
        <MainCard>
          <CustomerSelected
            customerSelected={customerSelected}
            // onDelete={handleDeleteCustomer}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
