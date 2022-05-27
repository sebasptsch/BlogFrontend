import {
  Divider,
  Heading,
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
import { useMe, useMyPosts } from "@hooks";
import { Helmet } from "react-helmet";
import PostCreationDrawer from "../../components/PostCreationDrawer";
import PostMenu from "../../components/PostMenu";

export default function AdminIndex() {
  const { posts, isError: postsError, isLoading: postsLoading } = useMyPosts();
  const { user, isError: userError, isLoading: userLoading } = useMe();
  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Heading as="h1" textAlign={"center"}>
        Admin Dashboard
      </Heading>
      <Divider my={5} />
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
            {!!posts?.length ? (
              posts
                ?.sort((a, b) => a.publishedAt < b.publishedAt)
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
                ))
            ) : (
              <Tr>
                <Td>No Posts Yet</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            )}
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
