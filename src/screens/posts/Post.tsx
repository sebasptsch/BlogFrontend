import { useParams } from "react-router-dom";
import usePost from "../../hooks/post.hook";

export default function PostScreen() {
  let { slug } = useParams();
  const { isLoading, isError, post } = usePost(slug);
  return <>{post?.id}</>;
}
