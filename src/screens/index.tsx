import loadable from "@loadable/component";

export const AdminIndex = loadable(() => import("./admin/AdminIndex"));
export const Edit = loadable(() => import("./admin/Edit"));
export const AuthScreen = loadable(() => import("./auth/Auth"));
export const DefaultAuth = loadable(() => import("./auth/DefaultAuth"));
export const Login = loadable(() => import("./auth/Login"));
export const Register = loadable(() => import("./auth/Register"));
export const HomeScreen = loadable(() => import("./home/HomeScreen"));
export const ImagesScreen = loadable(() => import("./images/ImagesScreen"));
export const PostScreen = loadable(() => import("./posts/Post"));
export const Profile = loadable(() => import("./profile/Profile"));
export const NotFound = loadable(() => import("./NotFound"));
