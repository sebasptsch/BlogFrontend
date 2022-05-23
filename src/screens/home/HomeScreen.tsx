import { Heading, Stack, Text } from "@chakra-ui/react";
import Posts from "../posts/Posts";

export default function HomeScreen() {
  return (
    <>
      <Stack textAlign={"center"}>
        <Heading as="h1" textAlign={"center"}>
          Sebastian's Blog
        </Heading>
        <Text as="h2" fontSize={"2xl"}>
          An archive and showcase of my experiences and projects.
        </Text>
      </Stack>
      <Posts title={false} />
    </>
  );
}
