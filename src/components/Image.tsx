import { Box, ButtonGroup, IconButton, Image } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useSWRConfig } from "swr";
import { api } from "../api";

const ImageComponent: React.FC<{
  image: {
    id: number;
    userId: number;
  };
  boxSize?: string;
}> = (props) => {
  const { mutate } = useSWRConfig();
  // const { isError, isLoading, image} = useImage(props.id)
  const deleteImg = () => {
    api.images.deleteImage(props.image.id).then(() => mutate("/images"));
  };
  // console.log(props.image);
  return (
    <Box
      // as="a"
      // href={`http://localhost:3000/images/${props.id}`}
      overflow="hidden"
      borderWidth={"1px"}
      borderRadius="lg"
    >
      <Image
        src={`https://api.sebasptsch.dev/images/${props.image.id}`}
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
          {/* <IconButton
            aria-label="Set Avatar"
            onClick={setAsAvatar}
            icon={<BsPersonSquare />}
            colorScheme="blue"
          /> */}
        </ButtonGroup>
      </Box>
    </Box>
  );
};
export default ImageComponent;
