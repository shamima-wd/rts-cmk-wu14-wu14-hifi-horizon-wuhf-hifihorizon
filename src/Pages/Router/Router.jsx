import { createBrowserRouter } from "react-router";
import Layout from "../../Components/Layout/Layout";
//Pages
import Signup from "../Signup";
import Login from "../Login";
import Profile from "../Profile";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import Shop from "../Shop";
import AboutUs from "../About";
import Contact from "../Contact";
import Cart from "../Cart";
import Payment from "../Payment";

//Loaders
import { loadShop } from "../../loaders/shop_loader";
import { loadAboutUs } from "../../loaders/about_loader";
//FAQ Page
import FAQ from "../faq";
import ProductDetails from "../../Components/productDetails/ProductDetails";
import { loadProductDetails } from "../../loaders/product_details_loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
        loader: loadAboutUs,
      },
      {
        path: "/shop/:searchQuery?",
        element: <Shop />,
        loader: loadShop,
      },
      {
        path: "productdetails/:productId",
        element: <ProductDetails />,
        loader: loadProductDetails,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
]);
