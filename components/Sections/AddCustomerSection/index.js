import { Box, Typography } from "@mui/material";
import MainCard from "../../MainCard";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import AddCustomerDialog from "../../AddCustomerDialog";

export default function AddCustomerSection() {
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddCustomerClick = (event) => {
    setOpenPopup(true);
  };

  return (
    <Box mb={5}>
      <AddCustomerDialog open={openPopup} setOpen={setOpenPopup} />
      <MainCard
        sx={{
          padding: "1.3em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--primary-font-family)",
        }}
      >
        <Typography component="h1" fontWeight={600}>
          Customers List
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddCustomerClick}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            fontFamily: "var(--primary-font-family)",
            backgroundColor: "var(--btn-color-blue)",
            height: "38px",
            textTransform: "none",
            fontSize: "13px",
            boxShadow: "none",
            "&.MuiButtonBase-root.MuiButton-root:hover": {
              boxShadow: "none",
            },
            "& .MuiButton-startIcon>*:nth-of-type(1)": {
              fontSize: "17px!important",
              marginBottom: " 4px",
            },
          }}
        >
          Add Customer
        </Button>
      </MainCard>
    </Box>
  );
}
