import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import useMe from "./hooks/me.hook";
import AdminIndex from "./screens/admin/AdminIndex";
import EditPost from "./screens/admin/Edit";
import AuthScreen from "./screens/auth/Auth";
import DefaultAuth from "./screens/auth/DefaultAuth";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import PostScreen from "./screens/posts/Post";
import Posts from "./screens/posts/Posts";
import Me from "./screens/users/User";

export default function AppRouter() {
  const { user, isError, isLoading } = useMe();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Posts />} />
          <Route path="auth" element={<AuthScreen />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route index element={<DefaultAuth />} />
          </Route>
          <Route path="users">
            <Route path="me" element={<Me />} />
          </Route>
          <Route path="posts">
            <Route path=":slug" element={<PostScreen />} />
          </Route>
          <Route path="admin">
            <Route index element={<AdminIndex />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoute = ({ user, redirectPath = "/auth", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
