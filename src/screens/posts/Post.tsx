import { Divider, Heading, Skeleton } from "@chakra-ui/react";
import { usePostSlug } from "@hooks";
import { useParams } from "react-router-dom";
import RichTextRenderer from "../../components/Editor/RichTextRenderer";

export default function PostScreen() {
  let { slug } = useParams();
  const { isLoading, isError, post } = usePostSlug(slug);
  if (isLoading) {
    return <Skeleton />;
  } else {
    console.log(post.content.content);
    return (
      <>
        <Heading>{post.title}</Heading>
        <Divider />
        <RichTextRenderer content={post.content.content} />
      </>
    );
  }
}
