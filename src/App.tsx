import { Container, Flex, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Flex direction={"column"} minH="100vh">
        <Nav />
        <Container maxW="container.lg">
          <Outlet />
        </Container>
        <Spacer />
        <Footer />
      </Flex>
    </>
  );
}

export default App;
