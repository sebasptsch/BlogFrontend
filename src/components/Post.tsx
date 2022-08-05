import { Heading, LinkBox, Tag, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { MinimalPostDto } from "../generated";

// interface Post {
//   id: number;
//   status: "PUBLISHED" | "DRAFT";
//   slug: string;
//   title: string;
//   summary: string;
//   content: object;
//   userId: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

export const PostItem: React.FC<{ post: MinimalPostDto }> = (props: {
  post;
}) => {
  return (
    <LinkBox
      as={Link}
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      to={`/posts/${props.post.slug}`}
    >
      {DateTime.fromISO(props.post.publishedAt).toRelativeCalendar()}
      {props.post.status === "PUBLISHED" ? null : (
        <Tag>{props.post.status}</Tag>
      )}
      <Heading size="md" my={2}>
        {props.post.title}
      </Heading>
      <Text>{props.post.summary}</Text>
    </LinkBox>
  );
};
