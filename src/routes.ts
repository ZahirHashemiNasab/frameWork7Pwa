import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import FormPage from "./components/pages/FormPage";
import DynamicRoutePage from "./components/pages/DynamicRoutePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import PanelLeftPage from "./components/pages/PanelLeftPage";
import PanelRightPage from "./components/pages/PanelRightPage";
import Businesses from "./components/pages/Businesses";
import LoginPage from "./components/pages/LoginPage";

export default [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/businesses",
    component: Businesses,
  },
  {
    path: "/panel-left/",
    component: PanelLeftPage,
  },
  {
    path: "/panel-right/",
    component: PanelRightPage,
  },
  {
    path: "/about/",
    component: AboutPage,
  },
  {
    path: "/form/",
    component: FormPage,
  },
  ,
  {
    path: "/login/",
    component: LoginPage,
  },
  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];
