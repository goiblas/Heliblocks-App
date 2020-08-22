import React from "react";
import Header from "components/header";
import Footer from "components/footer";
import Hero from "./hero";
import Feature from "./features";
import PickedList from "./pickedList";
import { Container, Main } from "components/containers";
import { Title, Meta } from 'react-head';

const Home = () => (
  <>
    <Title>Heliblocks - Build, reuse &amp; enjoy</Title>
    <Meta name="description" content="Take advantage of the editing capacity of the WordPress block editor, the customization of CSS variables to create landing pages in minutes by reusing HTML and CSS snippets, forget about visual constructors to create awesome designs" />
    <Header />
    <Container as={Main}>
      <Hero />
      <Feature />
      <PickedList />
    </Container>
    <Footer />
  </>
);
export default Home;
