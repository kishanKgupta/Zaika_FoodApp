import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import Contact from "./Contact.jsx";
import ErrorPage from "./ErrorPage.jsx";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement:<ErrorPage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
