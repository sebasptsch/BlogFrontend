import { Heading } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet title="404 - Not found"></Helmet>
      <Heading as="h1">404 - Not Found</Heading>
    </>
  );
};

export default NotFound;
