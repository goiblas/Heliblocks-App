import React from "react";
import Routes from "./routes";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "theme";
import { withAuth } from "services/auth";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Routes />
    </ThemeProvider>
  );
}

export default withAuth(App);
