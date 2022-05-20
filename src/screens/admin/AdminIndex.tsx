import {
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PostCreationDrawer from "../../components/PostCreationDrawer";
import PostMenu from "../../components/PostMenu";
import useMe from "../../hooks/me.hook";
import useMyPosts from "../../hooks/myposts.hook";

export default function AdminIndex() {
  const { posts, isError: postsError, isLoading: postsLoading } = useMyPosts();
  const { user, isError: userError, isLoading: userLoading } = useMe();
  return (
    <>
      <PostCreationDrawer />
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Status</Th>
              <Th isNumeric>Menu</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts
              ?.sort((postA, postB) => postA.createdAt > postB.createdAt)
              .map((post) => (
                <Tr key={post.id}>
                  <Td>{post.title}</Td>
                  <Td>{post.slug}</Td>
                  <Td>
                    <Tag
                      colorScheme={post.status === "DRAFT" ? "blue" : "green"}
                    >
                      {post.status}
                    </Tag>
                  </Td>
                  <Td isNumeric>
                    <PostMenu post={post} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Status</Th>
              <Th isNumeric>Menu</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
