import { Container, Spinner } from "@chakra-ui/react";
import moment from "moment";
import Images from "../../components/Images";
import ImageUploadModal from "../../components/ImageUploadModal";
import useMe from "../../hooks/me.hook";

export default function Me() {
  const { isLoading, isError, user } = useMe();
  return (
    <Container size="md">
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

      <Images />
    </Container>
  );
}
