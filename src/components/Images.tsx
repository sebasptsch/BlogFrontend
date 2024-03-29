import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useImages } from "@hooks";
import ImageComponent from "./Image";

const Images: React.FC = () => {
  const { isError, isLoading, images } = useImages();
  return (
    <>
      <Box maxW="md" borderWidth="1px" borderRadius="lg" p={5}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {images?.map((image) => (
            <GridItem w="100%" key={image.id}>
              <ImageComponent image={image} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default Images;
