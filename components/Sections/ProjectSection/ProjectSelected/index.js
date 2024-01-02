import { Grid, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import FieldAndValue from "../../../FieldAndValue";
import ConfirmationDialog from "../../../ConfirmationDialog";

export default function ProjectSelected({ projectSelected, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleAccept = () => {};

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCustomer = () => {
    if (onDelete) {
      onDelete(leadSelected.id);
    }
  };

  return (
    <Grid container p={2}>
      <Grid item xs={5}>
        <Typography noWrap fontSize={20} fontWeight={600}>
          {projectSelected.customerName} {projectSelected.customerLastname}
        </Typography>
      </Grid>
      <Grid item xs={7} container justifyContent="flex-end" spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              height: "38px",
              textTransform: "none",
              fontFamily: "var(--primary-font-family)",
              backgroundColor: "var(--tb-primary-bg-subtle)",
              fontSize: "13px",
              color: "var(--btn-color-blue)",
              boxShadow: "none",
              "&.MuiButtonBase-root.MuiButton-root:hover": {
                boxShadow: "none",
                backgroundColor: "var(--btn-color-blue)",
                color: "white",
              },
            }}
            onClick={handleAccept}
          >
            Send Email
          </Button>
        </Grid>
        {/* <Grid item>
          <Button
            className="delete-button"
            variant="contained"
            sx={{
              height: "38px",
              minWidth: "40px",
              width: "40px",
              boxShadow: "none",
              "&.MuiButtonBase-root.MuiButton-root:hover": {
                boxShadow: "none",
              },
            }}
            centerRipple
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </Grid> */}
      </Grid>
      <FieldAndValue
        mt={5}
        fieldsAndValues={projectSelected}
        fieldMappings={{
          customerName: "Customer Name",
          customerLastname: "Customer Lastname",
          orderDate: "Order Date",
          deliveryDate: "Delivery Date",
          retailAmount: "Retail Amount",
        }}
        order={[
          "customerName",
          "customerLastname",
          "orderDate",
          "deliveryDate",
          "retailAmount",
        ]}
      />
      {/* <ConfirmationDialog
        open={open}
        onClose={handleClose}
        text={`Are you sure you want to permanently delete customer ${leadSelected.fullName}?`}
        leftBtnText={"DELETE"}
        rightBtnText={"CANCEL"}
        onClickLeftBtn={handleDeleteCustomer}
        //onClickRightBtn={handleClose}
      /> */}
    </Grid>
  );
}
