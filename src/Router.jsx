import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import { postsLoader } from "./loaders/postsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts />, loader: postsLoader },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
