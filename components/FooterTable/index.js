import {
  gridPageSelector,
  useGridApiContext,
  gridPageCountSelector,
  useGridSelector,
} from "@mui/x-data-grid";
import { Stack, Pagination, PaginationItem, Typography } from "@mui/material";

const buttonsStyle = {
  fontFamily: "var(--primary-font-family)",
  textTransform: "none",
  fontWeight: 500,
  backgroundColor: "transparent",
  fontSize: "13px",
  color: "var(--btn-color-blue)",
};

export function Previous() {
  return <Typography sx={buttonsStyle}>Previous</Typography>;
}
export function Next() {
  return <Typography sx={buttonsStyle}>Next</Typography>;
}

export default function FooterTable() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const results = apiRef.current.getRowsCount();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      minHeight={50}
    >
      <Typography
        ml={2}
        fontFamily="var(--primary-font-family)"
        fontSize={"13px"}
        color={"var(--font-color-v2)"}
      >
        Showing {<span style={{ fontWeight: 600 }}>10</span>} of{" "}
        {<span style={{ fontWeight: 600 }}>{results}</span>} Results
      </Typography>
      <Pagination
        sx={{ mr: 2 }}
        className="footer-pagination"
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        renderItem={(item) => (
          <PaginationItem
            className="footer-pagination-item"
            shape="rounded"
            components={{
              previous: Previous,
              next: Next,
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
