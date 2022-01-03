import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import grey from "@mui/material/colors/grey";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import Topbar from "./components/topbar";
import Welcome from "./components/welcome";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: grey[700],
      paper: grey[900],
    },
  },
});

export default function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Topbar />
          <Routes>
            <Route path="*" element={<Welcome/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CssBaseline>
  );
}
