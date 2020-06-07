import React from "react";
import Header from "components/header";
import Footer from "components/footer";
import Hero from "./hero";
import Feature from "./features";
import PickedList from "./pickedList";
import { Container, Main } from "components/containers";

const Home = () => (
  <>
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
