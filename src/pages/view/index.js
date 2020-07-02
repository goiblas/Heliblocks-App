import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading, Box } from "@chakra-ui/core";
import { getHeliblock } from "services/heliblocks";
import NotFound from "pages/notFound";
import { Main, Container } from "components/containers";
import Loading from "components/loading";
import Header from "components/header";
import Footer from "components/footer";
import RelatedList from "./relatedList";
import Details from "./details";
import HeliblocksViewer from "./heliblockViewer";

const View = () => {
  const { heliblockId } = useParams();
  const [heliblock, setHeliblock] = useState(null);

  useEffect(() => {
    setHeliblock(null);

    getHeliblock(heliblockId)
      .then(setHeliblock)
      .catch(error => {});
  }, [heliblockId]);

  if (!heliblock) {
    return (
      <>
        <Header />
        <Main>
          <Loading />
        </Main>
        <Footer />
      </>
    );
  }

  if (heliblock.notFound) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <Main>
        <Container pt="12" pb="2">
          <Details
            title={heliblock.title}
            author={heliblock.author}
            tags={heliblock.tags}
            description={heliblock.description}
            id={heliblockId}
          />
        </Container>
        <HeliblocksViewer
          height="calc(90vh - 260px)"
          html={heliblock.html}
          css={heliblock.css}
          alignment={heliblock.alignment}
          additionalLinks={heliblock.additionalLinks}
        />
        <Container py="16">
          <Box mb="10">
            <Heading as="h2" fontSize={["xl", null, "2xl", "3xl"]} mb="8">
              Heliblocks Related
            </Heading>
            <RelatedList heliblock={heliblock} id={heliblockId} />
          </Box>
        </Container>
      </Main>
      <Footer />
    </>
  );
};
export default View;
