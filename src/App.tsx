import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Container maxW="container.lg">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
