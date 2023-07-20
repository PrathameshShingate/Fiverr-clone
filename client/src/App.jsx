import Navbar from "./components/Navbar";
import AuthWrapper from "./components/AuthWrapper";
import Home from "./pages/Home";
import Seller from "./pages/seller/Seller";
import MyGigs from "./pages/seller/MyGigs";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/Gigs";
import Edit from "./pages/seller/Edit";
import Create from "./pages/seller/Create";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const queryClient = new QueryClient();

  const Layout = () => {
    const { state } = useContext(ModalContext);

    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar />
          <ToastContainer />
          {(state.showSignInModal || state.showSignUpModal) && (
            <AuthWrapper type={state.showSignInModal ? "signIn" : "signUp"} />
          )}
          <Outlet />
          <Footer />
        </div>
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/seller",
          element: <Seller />,
        },
        {
          path: "/seller/gigs",
          element: <MyGigs />,
        },
        {
          path: "/seller/gigs/:gigId",
          element: <Edit />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/seller/gigs/create",
          element: <Create />,
        },
        {
          path: "/seller/orders",
          element: <Orders />,
        },
        {
          path: "/buyer/orders",
          element: <Orders />,
        },
        {
          path: "/gig/:gigId",
          element: <Gig />,
        },
        {
          path: "/add",
          element: <Create />,
        },
        {
          path: "/seller/orders/messages",
          element: <Messages />,
        },
        {
          path: "/seller/orders/message/:id",
          element: <Message />,
        },
        {
          path: "/buyer/orders/messages",
          element: <Messages />,
        },
        {
          path: "/buyer/orders/message/:id",
          element: <Message />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
