import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Spacer,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { useImages } from "@hooks";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet";
import { useSWRConfig } from "swr";
import { ImageUploadModal } from "../../components";
import { deleteImage } from "../../utils/requests";

const ImagesScreen = () => {
  const { images, isLoading, isError } = useImages();
  const { mutate } = useSWRConfig();
  const alert = useAlert();

  return (
    <>
      <Helmet defaultTitle="Images">
        <title>Images</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Heading as="h1" textAlign={"center"}>
        Images
      </Heading>
      <Divider my={5} />
      <ImageUploadModal />
      <SimpleGrid gridTemplateRows="masonry" columns={[1, 2, 3]} gap={2} my={2}>
        {isLoading ? (
          <Skeleton />
        ) : (
          images?.map((image) => (
            <ImageBox
              image={{ id: image.id, mutate, alert, name: image.name }}
            />
          ))
        )}
      </SimpleGrid>
    </>
  );
};

const ImageBox = (data: {
  image: { id: number; mutate; alert; name: string };
}) => {
  const { onCopy, hasCopied } = useClipboard(`/api/images/${data.image.id}`);
  return (
    <Box
      key={data.image.id}
      overflow="hidden"
      borderWidth={"1px"}
      borderRadius="lg"
    >
      <img
        src={`https://api.sebasptsch.dev/images/${data.image.id}`}
        alt={data.image.id.toString()}
        style={{ height: "auto", objectFit: "fill" }}
      />
      <Divider w="100%" />
      <Text textAlign="center">{data.image.name}</Text>
      <Flex m={2}>
        <Button colorScheme={"blue"} size="sm" onClick={onCopy}>
          {hasCopied ? "Copied" : "Copy Image URL"}
        </Button>
        <Spacer />
        <Button
          colorScheme={"red"}
          size="sm"
          onClick={() => {
            deleteImage(data.image.mutate, data.image.id, data.image.alert);
          }}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};
export default ImagesScreen;
