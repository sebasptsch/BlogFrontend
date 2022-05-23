import { Spinner } from "@chakra-ui/react";
import { useIsAdmin, useLoggedIn } from "@hooks";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import App from "./App";
import AdminIndex from "./screens/admin/AdminIndex";
import EditPost from "./screens/admin/Edit";
import AuthScreen from "./screens/auth/Auth";
import DefaultAuth from "./screens/auth/DefaultAuth";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import HomeScreen from "./screens/home/HomeScreen";
import ImagesScreen from "./screens/images/ImagesScreen";
import PostScreen from "./screens/posts/Post";
import Me from "./screens/profile/Profile";

export default function AppRouter() {
  const { loggedIn, isLoading: isLoggedInLoading } = useLoggedIn();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeScreen />} />
          <Route
            path="auth"
            element={
              <IsntLoggedInRoute
                loggedIn={loggedIn}
                isLoading={isLoggedInLoading}
              >
                <AuthScreen />
              </IsntLoggedInRoute>
            }
          >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route index element={<DefaultAuth />} />
          </Route>
          <Route
            path="images"
            element={
              <AdminRoute isAdmin={isAdmin} isLoading={isAdminLoading}>
                <ImagesScreen />
              </AdminRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute loggedIn={loggedIn} isLoading={isLoggedInLoading}>
                <Me />
              </ProtectedRoute>
            }
          />
          <Route path="posts">
            <Route path=":slug" element={<PostScreen />} />
          </Route>
          <Route
            path="admin"
            element={
              <AdminRoute isAdmin={isAdmin} isLoading={isAdminLoading}>
                <Outlet />
              </AdminRoute>
            }
          >
            <Route index element={<AdminIndex />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoute = ({
  loggedIn,
  isLoading,
  redirectPath = "/auth",
  children,
}) => {
  if (isLoading) return <Spinner />;
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const IsntLoggedInRoute = ({
  loggedIn,
  isLoading = true,
  redirectPath = "/profile",
  children,
}) => {
  if (isLoading) return <Spinner />;
  if (loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const AdminRoute = ({
  isAdmin,
  isLoading = true,
  redirectPath = "/",
  children,
}) => {
  if (isLoading) return <Spinner />;
  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
