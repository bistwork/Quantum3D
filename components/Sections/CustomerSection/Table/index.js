import React, { useRef, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import FooterTable from "../../../FooterTable";

const initialColumns = [
  {
    field: "fullName",
    headerName: "Full Name",
    flex: 2,
    valueGetter: (params) =>
      `${params.row.primaryInfo.firstName} ${params.row.primaryInfo.lastName}`,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2.5,
    valueGetter: (params) => params.row.primaryInfo.email,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 2,
    valueGetter: (params) => params.row.primaryInfo.primaryPhone,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    flex: 1,
    valueGetter: (params) => params.row.primaryInfo.status,
  },
];

export default function DataTable({ tableRows, ...props }) {
  const [columns, setColumns] = useState(
    props.initialColumns || initialColumns
  );
  const [selectionModel, setSelectionModel] = useState([]);

  const containerRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setColumns((columns) =>
          columns.map((col) => ({
            ...col,
            width: Math.floor(containerWidth * (col.flex / 7.5)),
          }))
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    const selectedRow = tableRows.filter((row) =>
      newSelectionModel.includes(row.id)
    );
    if (selectedRow.length > 0) {
      props.onSelect(selectedRow[0]);
    }
  };

  return (
    <div ref={containerRef} style={{ height: 585, width: "100%" }}>
      <DataGrid
        className={`${props.showHeader ? "showHeader" : "noHeader"} main-table`}
        selectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionModelChange}
        hideFooterSelectedRowCount
        rows={tableRows}
        rowHeight={53}
        columnHeaderHeight={props.showHeader ? 53 : 0}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          fontFamily: "var(--primary-font-family)",
          boxShadow: "none",
          borderColor: "transparent",
          fontSize: "13px",
          backgroundColor:"#ffffff"
          // backgroundColor:"#eef0f7!important",
        }}
        slots={{
          footer: FooterTable,
        }}
      />
    </div>
  );
}
