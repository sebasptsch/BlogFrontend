import { Heading, Skeleton, Stack } from "@chakra-ui/react";
import useSWR from "swr";
import PostItem from "../../components/Post";
import { fetcher } from "../../utils";

export default function Posts() {
  const { error, data } = useSWR<
    {
      id: number;
      status: "PUBLISHED" | "DRAFT";
      slug: string;
      title: string;
      summary: string;
      content: object;
      userId: number;
      createdAt: string;
      updatedAt: string;
    }[]
  >("/posts", fetcher);
  return (
    <>
      <Heading>Posts</Heading>
      <Stack>
        {/* <>{JSON.stringify(data, undefined, 2)}</> */}
        {data ? (
          data.map((post) => <PostItem post={post} key={post.id} />)
        ) : (
          <Skeleton />
        )}
      </Stack>
    </>
  );
}
