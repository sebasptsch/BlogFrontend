import { Box, ButtonGroup, IconButton, Image } from "@chakra-ui/react";
import { BsPersonSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { api } from "../utils";
export default function ImageComponent(props: {
  image: {
    id: number;
    userId: number;
    avatarUserId?: number;
  };
  boxSize?: string;
}) {
  // const { isError, isLoading, image} = useImage(props.id)
  const deleteImg = () => api.delete(`/images/${props.image.id}`);
  // console.log(props.image);
  const setAsAvatar = () =>
    api.patch("/users", {
      avatarId: props.image.id,
    });
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
        src={`http://localhost:3002/api/images/${props.image.id}`}
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
