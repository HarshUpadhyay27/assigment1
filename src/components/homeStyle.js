import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
      padding: "1rem",
    },
    paper: {
      borderRadius: ".7rem",
    },
    tableTitle: {
      padding: ".3rem 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    addIcon: {
      color: "#fff",
      height: "48px",
      width: "48px",
    },
    table: {
      border: "1px solid #c7c7c7",
      borderRadius: ".7rem",
    },
    tableHead: {
      background: "#e5e5e5",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    tableRow: {
      display: "grid",
      gridTemplateColumns: "3rem 1fr 1fr 1fr 1fr 1fr 1fr 6rem",
      gap: "1rem",
      padding: ".5rem",
      alignItems: "center",
      borderBottom: "1px solid #c6c4c4",
    },
    textFlow: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    actionBtns: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
    },
    actionBtn: {
      height: "40px",
      width: "40px",
      color: "#fff",
      fontSize: ".7rem",
    },
    tableBoody: {
      display: "flex",
      flexDirection: "column",
      height: `calc(100vh - 330px )`,
      overflowY: "auto",
    },
    serialNo: {
        textAlign: "center",
        opacity: ".7"
    }
  }));

  export default useStyle