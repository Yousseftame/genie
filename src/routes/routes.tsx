import { createBrowserRouter } from "react-router-dom";

import NotFound from "@/pages/NotFound/NotFound";
import AuthLayOut from "@/layouts/AuthLayOut/AuthLayOut";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import MasterLayOut from "@/layouts/MasterLayOut/MasterLayOut";
import Home from "@/pages/Home/Home";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayOut />,
    errorElement: <NotFound />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // { path: "forget-password", element: <ForgetPassword /> },
      // { path: "reset-password", element: <ResetPassword /> },
    ],
  },

 

  {
    path: "/",
    element: <MasterLayOut />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },

     
    ],
  },
]);
