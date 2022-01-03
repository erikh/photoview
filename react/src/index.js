import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";

import grey from "@mui/material/colors/grey";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: grey[700],
      paper: grey[900],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById("root")
);
