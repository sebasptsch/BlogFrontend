import { Spinner } from "@chakra-ui/react";
import { useIsAdmin, useLoggedIn } from "@hooks";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
const App = React.lazy(() => import("./App"));
const AdminIndex = React.lazy(() => import("./screens/admin/AdminIndex"));
const EditPost = React.lazy(() => import("./screens/admin/Edit"));
const AuthScreen = React.lazy(() => import("./screens/auth/Auth"));
const DefaultAuth = React.lazy(() => import("./screens/auth/DefaultAuth"));
const Login = React.lazy(() => import("./screens/auth/Login"));
const Register = React.lazy(() => import("./screens/auth/Register"));
const HomeScreen = React.lazy(() => import("./screens/home/HomeScreen"));
const ImagesScreen = React.lazy(() => import("./screens/images/ImagesScreen"));
const PostScreen = React.lazy(() => import("./screens/posts/Post"));
const Me = React.lazy(() => import("./screens/profile/Profile"));

export default function AppRouter() {
  const { loggedIn, isLoading: isLoggedInLoading } = useLoggedIn();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <App />
            </React.Suspense>
          }
        >
          <Route
            index
            element={
              <React.Suspense fallback={<>...</>}>
                <HomeScreen />
              </React.Suspense>
            }
          />
          <Route
            path="auth"
            element={
              <IsntLoggedInRoute
                loggedIn={loggedIn}
                isLoading={isLoggedInLoading}
              >
                <React.Suspense fallback={<>...</>}>
                  <AuthScreen />
                </React.Suspense>
              </IsntLoggedInRoute>
            }
          >
            <Route
              path="register"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Register />
                </React.Suspense>
              }
            />
            <Route
              path="login"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              index
              element={
                <React.Suspense fallback={<>...</>}>
                  <DefaultAuth />
                </React.Suspense>
              }
            />
          </Route>
          <Route
            path="images"
            element={
              <AdminRoute isAdmin={isAdmin} isLoading={isAdminLoading}>
                <React.Suspense fallback={<>...</>}>
                  <ImagesScreen />
                </React.Suspense>
              </AdminRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute loggedIn={loggedIn} isLoading={isLoggedInLoading}>
                <React.Suspense fallback={<>...</>}>
                  <Me />
                </React.Suspense>
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
            <Route
              index
              element={
                <React.Suspense fallback={<>...</>}>
                  <AdminIndex />
                </React.Suspense>
              }
            />
            <Route
              path="edit/:id"
              element={
                <React.Suspense fallback={<>...</>}>
                  <EditPost />
                </React.Suspense>
              }
            />
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
