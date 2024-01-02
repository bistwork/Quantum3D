import { Grid, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import FieldAndValue from "../../../FieldAndValue";
import ConfirmationDialog from "../../../ConfirmationDialog";

export default function LeadSelected({ leadSelected, onDelete }) {
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
          {leadSelected.fullName}
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
            Accept Lead
          </Button>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <FieldAndValue
        mt={5}
        fieldsAndValues={leadSelected}
        fieldMappings={{
          fullName: "Full Name",
          email: "Email",
          phoneNumber: "Phone Number",
          zipCode: "Zip Code",
          pergolaModel: "Pergola Model",
          address: "Address",
          typeOfProperty: "Type Of Property",
        }}
        order={[
          "fullName",
          "email",
          "phoneNumber",
          "zipCode",
          "pergolaModel",
          "address",
          "typeOfProperty",
        ]}
      />
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        text={`Are you sure you want to permanently delete customer ${leadSelected.fullName}?`}
        leftBtnText={"DELETE"}
        rightBtnText={"CANCEL"}
        onClickLeftBtn={handleDeleteCustomer}
        //onClickRightBtn={handleClose}
      />
    </Grid>
  );
}
