import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import { api } from "@utils";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";

interface Props {
  post: Post;
}

type Status = "PUBLISHED" | "DRAFT";

interface Post {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  content: any;
  id: number;
  userId: number;
  status: Status;
}

const PostMenu: React.FC<Omit<MenuProps, "children"> & Props> = ({
  post,
  ...rest
}: Props & Omit<MenuProps, "children">) => {
  const { mutate } = useSWRConfig();
  return (
    <Menu {...rest}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            if (post.status === "PUBLISHED") {
              // Make Draft
              api.patch(`/posts/${post.id}`, { status: "DRAFT" }).then(() => {
                mutate("/posts/me");
              });
            } else if (post.status === "DRAFT") {
              // Publish
              api
                .patch(`/posts/${post.id}`, { status: "PUBLISHED" })
                .then(() => {
                  mutate("/posts/me");
                });
            }
          }}
        >
          {post.status === "PUBLISHED" ? "Draft" : "Publish"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            api.delete(`/posts/${post.id}`).then(() => {
              mutate("/posts/me");
            });
          }}
        >
          Delete
        </MenuItem>
        <MenuItem as={Link} to={`/admin/edit/${post.id}`}>
          Edit
        </MenuItem>
        {/* <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
