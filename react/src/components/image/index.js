import * as React from "react";

import Container from "@mui/material/Container";

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
    <Container fixed>
      <img id="image" />
    </Container>
  );
}
