import {
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PaginationComp from "../utils/PaginationComp";
import { Add, DeleteForever, Edit } from "@material-ui/icons";
import AddMemberForm from "./AddMemberForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember } from "../redux/action/memberAction";
import useStyle from "./homeStyle";

let tableRow = [
  "name",
  "email",
  "address",
  "organization",
  "designation",
  "contact",
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const HomePgae = () => {
  const classes = useStyle();
  const { members } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCound] = useState(100);
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleFilter = (e, field) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filtered = members.filter((item) =>
      item[field].toLowerCase().includes(searchTerm)
    );
    setRowData(filtered);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(0);
  };

  const handleChangeCurrentPage = (value) => {
    setCurrentPage(value - 1);
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleUpdate = (bool, val) => {
    setIsUpdate(bool);
    setUpdateItem(val);
  };

  const handleDeleteMember = (id) => {
    dispatch(deleteMember(id));
  };

  const handleUpdateMember = (item) => {
    handleUpdate(true, item);
    handleDialog();
  };

  useEffect(() => {
    setRowData(members);
    setTotalCound(members?.length);
  }, [members]);

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div style={{ padding: "0 1rem" }}>
            <Grid className={classes.tableTitle}>
              <Typography variant="h2" component="h2">
                MEMBER TABLE
              </Typography>
              <Tooltip title="ADD MEMBER" aria-label="add member">
                <Fab
                  color="primary"
                  className={classes.addIcon}
                  onClick={handleDialog}
                >
                  <Add />
                </Fab>
              </Tooltip>
            </Grid>
            <TableContainer component={Paper} className={classes.table}>
              <Table component="div" aria-label="simple table">
                <TableHead component="div" className={classes.tableHead}>
                  <TableRow component="div">
                    <div className={classes.tableRow}>
                      <div></div>
                      {tableRow.map((key, i) => (
                        <TableSortLabel
                          active={orderBy === key}
                          direction={orderBy === key ? order : "asc"}
                          onClick={createSortHandler(key)}
                          key={i}
                        >
                          {key?.toUpperCase()}
                        </TableSortLabel>
                      ))}
                      <div></div>
                    </div>
                  </TableRow>
                </TableHead>
                <Grid className={classes.tableRow}>
                  <div></div>
                  {tableRow.map((item, i) => (
                    <TextField
                      key={i}
                      variant="outlined"
                      size="small"
                      onChange={(e) => handleFilter(e, item)}
                    />
                  ))}
                  <div></div>
                </Grid>
                <TableBody component="div" className={classes.tableBoody}>
                  {stableSort(rowData, getComparator(order, orderBy))
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((item, i) => (
                      <TableRow component="div" key={item._id}>
                        <div className={classes.tableRow}>
                          <div className={classes.serialNo}>
                            {pageSize * currentPage + i + 1}
                          </div>
                          {tableRow.map((key, i) => (
                            <div className={classes.textFlow} key={i}>
                              <Tooltip title={item[key]} aria-label={key}>
                                <span>{item[key]}</span>
                              </Tooltip>
                            </div>
                          ))}
                          <div className={classes.actionBtns}>
                            <Tooltip
                              title="EDIT MEMBER"
                              aria-label="edit member"
                            >
                              <Fab
                                color="primary"
                                className={classes.actionBtn}
                                onClick={() => handleUpdateMember(item)}
                              >
                                <Edit />
                              </Fab>
                            </Tooltip>
                            <Tooltip
                              title="DELETE MEMBER"
                              aria-label="delete member"
                            >
                              <Fab
                                color="secondary"
                                className={classes.actionBtn}
                                onClick={() => handleDeleteMember(item._id)}
                              >
                                <DeleteForever />
                              </Fab>
                            </Tooltip>
                          </div>
                        </div>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <PaginationComp
              pageSize={pageSize}
              pageSizes={[5, 10, 15]}
              totalCount={totalCount}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
              handleChangeCurrentPage={handleChangeCurrentPage}
            />
          </div>
        </Paper>
      </div>
      <AddMemberForm
        open={open}
        handleDialog={handleDialog}
        isUpdate={isUpdate}
        updateItem={updateItem}
        handleUpdate={handleUpdate}
      />
    </Layout>
  );
};

export default HomePgae;
