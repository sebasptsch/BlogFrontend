import { Heading, LinkBox, Tag } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

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

export default function PostItem(props: { post }) {
  return (
    <LinkBox
      as={Link}
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      to={`/posts/${props.post.slug}`}
    >
      {moment(props.post.publishedAt).calendar(null, {
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        lastWeek: "[last] dddd",
        nextWeek: "dddd",
        sameElse: "L",
      })}
      {props.post.status === "PUBLISHED" ? null : (
        <Tag>{props.post.status}</Tag>
      )}
      <Heading size="md" my={2}>
        {props.post.title}
      </Heading>
      <p>{props.post.summary}</p>
      By {props.post.user.name}
    </LinkBox>
  );
}
