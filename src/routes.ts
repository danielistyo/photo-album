import { RouteProps } from "react-router-dom";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import User from "./pages/User";

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/album/:id",
    component: Album,
  },
  {
    path: "/user/:id",
    component: User,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
];

export default routes;
