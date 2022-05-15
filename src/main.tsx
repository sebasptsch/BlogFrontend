import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ChakraAlert } from "./components/Alert";
import AuthScreen from "./screens/Auth";
import DefaultAuth from "./screens/DefaultAuth";
import Login from "./screens/Login";
import PostScreen from "./screens/Post";
import Posts from "./screens/Posts";
import Register from "./screens/Register";
import Me from "./screens/User";
import theme from "./utils/theme";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AlertProvider
        template={ChakraAlert}
        position={positions.BOTTOM_RIGHT}
        timeout={2000}
      >
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </ChakraProvider>
  </React.StrictMode>
);
