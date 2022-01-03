import * as React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useParams } from "react-router-dom";

const urlCreator = window.URL || window.webkitURL;

export default function Image() {
  let params = useParams();

  fetch(`/images/${params.imageName}`).then((data) => {
    data.blob().then((blob) => {
      document.getElementById("image").src = urlCreator.createObjectURL(blob);
    });
  });

  return (
    <Box sx={{ maxWidth: "100%", minWidth: "100%", bgcolor: "#121212" }}>
      <img id="image" />
    </Box>
  );
}
