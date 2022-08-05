import { Container, Flex, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer, Nav } from "./components";

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
