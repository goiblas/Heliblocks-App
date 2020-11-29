import React from "react";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme";
import { withAuth } from "services/auth";
import { HeadProvider, Title } from "react-head";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HeadProvider>
        <Title>Heliblocks</Title>
        <Routes />
      </HeadProvider>
    </ChakraProvider>
  );
}

export default withAuth(App);
