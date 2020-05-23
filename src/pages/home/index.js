import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Hero from "./hero";
import Feature from "./features";
import PickedList from "./pickedList";
import { Box, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <Header />
    <Box maxW="1340px" mx="auto" w="92%">
      <Hero />
      <Feature />
      <PickedList />
      <Box textAlign="center" py="10" mb="16">
        <Button as={Link} size="lg">
          Explore
        </Button>
      </Box>
    </Box>
    <Box borderTop="1px" borderColor="gray.200">
      <Box maxW="1340px" mx="auto" w="92%">
        <Footer />
      </Box>
    </Box>
  </>
);
export default Home;
