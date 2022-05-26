import {
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMe, useMyPosts } from "@hooks";
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useSortBy, useTable } from "react-table";
import PostCreationDrawer from "../../components/PostCreationDrawer";

export default function AdminIndex() {
  const { posts, isError: postsError, isLoading: postsLoading } = useMyPosts();
  const { user, isError: userError, isLoading: userLoading } = useMe();
  const data = useMemo(
    () =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        status: post.status,
        slug: post.slug,
      })),
    [posts]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

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
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
