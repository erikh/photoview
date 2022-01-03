import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Topbar from "./components/topbar";
import Welcome from "./components/welcome";
import Image from "./components/image";

export default function App() {
  return (
    <Router>
      <Routes>
        // these routes must be reflected in the ui() function of the rust //
        application.
        <Route path="/imageview">
          <Route path=":imageName" element={<Image />} />
        </Route>
        <Route
          path="*"
          element={
            <React.Fragment>
              <Topbar />
              <Welcome />
            </React.Fragment>
          }
        />
      </Routes>
    </Router>
  );
}
