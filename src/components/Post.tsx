import { Heading, LinkBox, Spinner, Tag } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import useUser from "../hooks/user.hook";

interface Post {
  id: number;
  status: "PUBLISHED" | "DRAFT";
  slug: string;
  title: string;
  summary: string;
  content: object;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function PostItem(props: { post: Post }) {
  const { user, isLoading, isError } = useUser(props.post.userId);
  return (
    <LinkBox
      as={Link}
      m={2}
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      to={`/posts/${props.post.slug}`}
    >
      {moment(props.post.updatedAt).fromNow()}
      {props.post.status === "PUBLISHED" ? null : (
        <Tag>{props.post.status}</Tag>
      )}
      <Heading size="md" my={2}>
        {props.post.title}
      </Heading>
      {isLoading ? <Spinner /> : isError ? "Error" : user.name}
    </LinkBox>
  );
}
