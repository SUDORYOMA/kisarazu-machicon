import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import BlogIndex from "../pages/blog/page";
import BlogPost from "../pages/blog/post";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <BlogIndex />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
