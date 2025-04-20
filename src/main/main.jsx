import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "../header/Header.jsx";
import Body from "./Body.jsx";
import Footer from "../footer/Footer.jsx";
import About from "../nav/About.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "../nav/Contact.jsx";
import ErrorPage from "./ErrorPage.jsx";
import RestaurantMenu from "../card/RestaurantMenu.jsx";
import HeaderBody from "../header/HeaderBody.jsx";
//import Grocery from "../grocery/Grocery.jsx";
const Grocery = lazy(() => import("../grocery/Grocery.jsx"));

const AppLayout = () => {
  return (
    <div>
      <Header />
      <HeaderBody/>
      <Outlet />
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
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
