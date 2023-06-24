import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import HomePgae from "./components/HomePgae";
import Login from "./components/Login";

const App = () => {
  const { auth } = useSelector((state) => state);

  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        {auth ? <HomePgae /> : <Login />}
      </ThemeProvider>
    </div>
  );
};

export default App;
