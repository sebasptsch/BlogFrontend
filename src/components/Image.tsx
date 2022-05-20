import { Box, ButtonGroup, IconButton, Image } from "@chakra-ui/react";
import axios from "axios";
import { BsPersonSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
export default function ImageComponent(props: {
  image: {
    id: number;
    userId: number;
    avatarUserId?: number;
  };
  boxSize?: string;
}) {
  // const { isError, isLoading, image} = useImage(props.id)
  const deleteImg = () =>
    axios.delete(`http://localhost:3000/images/${props.image.id}`, {
      withCredentials: true,
    });
  // console.log(props.image);
  const setAsAvatar = () =>
    axios.patch(
      "http://localhost:3000/users",
      {
        avatarId: props.image.id,
      },
      { withCredentials: true }
    );
  return (
    <Box
      // as="a"
      // href={`http://localhost:3000/images/${props.id}`}
      overflow="hidden"
      borderWidth={props.image.avatarUserId ? "3px" : "1px"}
      borderRadius="lg"
      borderColor={props.image.avatarUserId ? "green.300" : undefined}
    >
      <Image
        src={`http://localhost:3000/images/${props.image.id}`}
        // boxSize={props.boxSize ?? "100px"}
        // objectFit={"cover"}
      />
      <Box p="3">
        <ButtonGroup>
          <IconButton
            aria-label="Delete image"
            onClick={deleteImg}
            icon={<FaTrash />}
            colorScheme="red"
          />
          <IconButton
            aria-label="Set Avatar"
            onClick={setAsAvatar}
            icon={<BsPersonSquare />}
            colorScheme="blue"
          />
        </ButtonGroup>
      </Box>
    </Box>
  );
}
