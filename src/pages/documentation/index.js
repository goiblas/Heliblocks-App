import React, { useState } from "react";
import Header from "components/header";
import Markdown from "pages/documentation/markdown";
import Footer from "components/footer";
import { Container, Main } from "components/containers";
import { List, Box, Grid, Button, Select } from "@chakra-ui/core";
import DocsES from "./docs-es";
import DocsEN from "./docs-en";
import { Provider } from 'react-slot-fill';
import { Slot } from 'react-slot-fill';
import { Global, css } from '@emotion/core'

const languages = {
  en: {
    label: "English",
    content: DocsEN,
    filename: "docs-en.js"
  },
  es: {
    label: "Español",
    content: DocsES,
    filename: "docs-es.js"
  }
}
const Documentation = () => {
  const [language, setLanguage] = useState("es");
  const handleLanguage = ({ target }) => {
    setLanguage(target.value);
  }
  return (
    <>
  <Global styles={ css`
    html {
      scroll-behavior: smooth;
    }
  `} />
    <Header />
    <Container size="small" as={Main}>
      <Provider>
        <Grid py="4" templateColumns="repeat(12, 1fr)" gap="32px">
          <Box display={[ "none", null, "block"]} gridColumn="span 3" >
            <Box pos="sticky" top="16px">
                <List fontSize="small" py="16">
                  <Slot name="Docs.menu" />
                </List>
              <Select size="sm" value={language} onChange={handleLanguage}>
                  {Object.keys(languages).map(lang => (<option value={lang}>{languages[lang].label}</option>)
                )}
              </Select>
            </Box>
          </Box>
          <Box gridColumn={["span 12", null, "5/ span 8"]} pb="12%" >
            <Markdown content={languages[language].content} />
            <Box textAlign="center" py="8">
              <Button as="a" target="_blank" href={ "https://github.com/goiblas/Heliblocks-App/blob/master/src/pages/documentation/" + languages[language].filename }>Edit this page</Button>
            </Box>
          </Box>
        </Grid>
      </Provider>
    </Container>
    <Footer />
    </>
  )
};
export default Documentation;
