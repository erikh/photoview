import * as React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Welcome() {
  return (
    <Container maxWidth="sm">
      <Typography variant="body1" container="div">Welcome to Photo View!</Typography>
    </Container>
  );
}
