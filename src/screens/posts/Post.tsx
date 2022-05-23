import { Container, Divider, Heading, Skeleton } from "@chakra-ui/react";
import { usePostSlug } from "@hooks";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import RichTextRenderer from "../../components/Editor/RichTextRenderer";

export default function PostScreen() {
  let { slug } = useParams();
  const { isLoading, isError, post } = usePostSlug(slug);
  if (isLoading) {
    return <Skeleton />;
  } else {
    // console.log(post.content.content);
    return (
      <>
        <Helmet>
          <title>{post.title}</title>
          <meta name="description" content={post.summary} />
        </Helmet>
        <Heading as="h1" textAlign={"center"}>
          {post.title}
        </Heading>
        <Divider my={5} />
        <Container maxWidth={"container.md"}>
          <RichTextRenderer content={post.content.content} />
        </Container>
      </>
    );
  }
}
