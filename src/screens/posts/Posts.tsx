import { Heading, Skeleton, Stack } from "@chakra-ui/react";
import PostItem from "../../components/Post";
import { usePosts } from "../../hooks/posts.hook";

export default function Posts() {
  const { posts, isLoading, isError } = usePosts();
  return (
    <>
      <Heading>Posts</Heading>
      <Stack>
        {isLoading ? (
          <Skeleton />
        ) : (
          posts?.map((post) => <PostItem post={post} key={post.id} />)
        )}
      </Stack>
    </>
  );
}
