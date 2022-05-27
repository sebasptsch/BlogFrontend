import { Divider, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import PostItem from "../../components/Post";
import { usePosts } from "../../hooks/posts.hook";

export default function Posts({ title = true }: { title?: boolean }) {
  const { posts, isLoading, isError } = usePosts();
  return (
    <>
      {title ? (
        <Heading as="h1" textAlign={"center"}>
          Posts
        </Heading>
      ) : null}
      <Divider my={5} />
      <SimpleGrid columns={[1, 2]} spacing={10} width="100%">
        {isLoading ? (
          <Skeleton />
        ) : (
          posts
            ?.sort((a, b) => a.publishedAt < b.publishedAt)
            .map((post) => <PostItem post={post} key={post.id} />)
        )}
      </SimpleGrid>
    </>
  );
}
