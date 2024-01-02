import { Grid, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import FieldAndValue from "../../../FieldAndValue";
import ConfirmationDialog from "../../../ConfirmationDialog";
import AddCustomerDialog from "../../../AddCustomerDialog";

export default function CustomerSelected({ customerSelected, onDelete }) {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleEdit = () => {
    setOpenPopup(true);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCustomer = () => {
    if (onDelete) {
      onDelete(customerSelected.id);
    }
  };

  return (
    <Grid container p={2}>
      <AddCustomerDialog
        open={openPopup}
        setOpen={setOpenPopup}
        customerSelected={customerSelected}
      />
      <Grid item xs={5}>
        <Typography noWrap fontSize={20} fontWeight={600}>
          {customerSelected?.primaryInfo?.firstName || "Unknown"}{" "}
          {customerSelected?.primaryInfo?.lastName || "Unknown"}
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
            onClick={handleEdit}
          >
            Edit
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
        fieldsAndValues={customerSelected?.primaryInfo || {}}
        fieldMappings={{
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          primaryPhone: "Phone Number",
          additionalPhone: "Additional Phone Number",
          bussinesName: "Bussines Name",
          status: "Status",
        }}
        order={[
          "firstName",
          "lastName",
          "email",
          "primaryPhone",
          "additionalPhone",
          "bussinesName",
          "status",
        ]}
      />
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        text={`Are you sure you want to permanently delete customer ${customerSelected?.primaryInfo?.firstName} ${customerSelected?.primaryInfo?.lastName}?`}
        leftBtnText={"DELETE"}
        rightBtnText={"CANCEL"}
        onClickLeftBtn={handleDeleteCustomer}
        //onClickRightBtn={handleClose}
      />
    </Grid>
  );
}
