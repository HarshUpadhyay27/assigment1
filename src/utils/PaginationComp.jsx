import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { memo, useEffect, useState } from "react";

const PaginationComp = (props) => {
  const {
    pageSize,
    currentPage,
    pageSizes,
    totalCount,
    handleChangePage,
    handleChangeCurrentPage,
  } = props;

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    let value = Math.ceil(totalCount / pageSize);
    setPageNumber(value);
  }, [pageSize, totalCount]);

  return (
    <Grid
      style={{
        padding: ".5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexGrow: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Pagination
          count={pageNumber}
          page={currentPage + 1}
          onChange={(_, value) => handleChangeCurrentPage(value)}
        />
        <TextField
          select
          value={pageSize}
          onChange={handleChangePage}
          variant="outlined"
          size="small"
        >
          {pageSizes?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Typography style={{ marginLeft: ".8rem" }}>Items per page</Typography>
      </div>
      <div>
        <Typography>
          {/* {currentPage + 1} of {pageNumber} pages ({totalCount} Files) */}
        </Typography>
      </div>
    </Grid>
  );
};

export default memo(PaginationComp);
