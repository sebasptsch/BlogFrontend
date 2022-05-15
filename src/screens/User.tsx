import { Button, Code, Container, Spinner } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import Images from "../components/Images";
import ImageUploadModal from "../components/ImageUploadModal";
import useMe from "../hooks/me.hook";

export default function Me() {
  const { isLoading, isError, user } = useMe();
  return (
    <Container size="md">
      <Code>{JSON.stringify(user, undefined, 2)}</Code>
      {user ? (
        <>
          <b>Name: </b>
          {user.name}
          <br />
          <b>Created: </b>
          {moment(user.createdAt).fromNow()}
          <br />
          <b>Updated: </b>
          {moment(user.updatedAt).fromNow()}
          <ImageUploadModal />
        </>
      ) : (
        <Spinner />
      )}
      <br />
      <Button
        onClick={() => {
          axios.post("http://localhost:3000/auth/logout", undefined, {
            withCredentials: true,
          });
        }}
      >
        Logout
      </Button>
      <Images />
    </Container>
  );
}
