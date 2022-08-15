import loadable from "@loadable/component";

export * from "./Editor";

export const ChakraAlert = loadable(() => import("./Alert"));
export const Footer = loadable(() => import("./Footer"));
export const ImageComponent = loadable(() => import("./Image"));
export const Images = loadable(() => import("./Images"));
export const ImageUploadModal = loadable(() => import("./ImageUploadModal"));
export const Logo = loadable(() => import("./Logo"));
export const LogoIcon = loadable(() => import("./LogoIcon"));
export const Nav = loadable(() => import("./Nav"));
export const Post = loadable(() => import("./Post"));
export const PostCreationDrawer = loadable(
  () => import("./PostCreationDrawer")
);
export const PostMenu = loadable(() => import("./PostMenu"));
