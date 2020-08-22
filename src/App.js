import React from "react";
import Routes from "./routes";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "theme";
import { withAuth } from "services/auth";
import { HeadProvider, Title } from 'react-head';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HeadProvider>
        <Title>Heliblocks</Title>
        <CSSReset />
        <Routes />
      </HeadProvider>
    </ThemeProvider>
  );
}

export default withAuth(App);