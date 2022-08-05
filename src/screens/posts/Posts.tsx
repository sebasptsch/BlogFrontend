import { Divider, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { PostItem } from "../../components";
import { usePosts } from "../../hooks/posts.hook";

const Posts: React.FC<{ title?: boolean }> = ({ title = true }) => {
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
            ?.sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
            .map((post) => <PostItem post={post} key={post.id} />)
        )}
      </SimpleGrid>
    </>
  );
};
export default Posts;
