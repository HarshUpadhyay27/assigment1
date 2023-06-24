import { AppBar, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/action/globalType";

const useStyle = makeStyles((theme) => ({
  navbar: {
    padding: "0 2rem",
    color: "#fff",
  },
  navbatItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: GLOBALTYPES.AUTH, payload: null });
    localStorage.removeItem("auth");
    localStorage.removeItem("members");
  };

  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <div className={classes.navbatItem}>
          <Typography variant="h1" contained="h1">
            Member
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </AppBar>
      {children}
    </div>
  );
};

export default Layout;
