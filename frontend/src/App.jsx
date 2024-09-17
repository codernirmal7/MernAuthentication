import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import FloatingShape from "./components/FloatingShape";
import { Signup } from "./pages/Signup";
import Signin from "./pages/Signin";
import VerificationEmail from "./pages/VerificationEmail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn } from "./redux/slices/authSlice";
import { useEffect } from "react";
import Home from "./pages/Home";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/signin",
      element: (
        <>
          <Signin />
        </>
      ),
    },
    {
      path: "/verify-email",
      element: (
        <>
          <VerificationEmail />
        </>
      ),
    },
    {
      path: "/forget-password",
      element: (
        <>
          <ForgetPassword />
        </>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <>
          <ResetPassword />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <NotFound />
        </>
      ),
    },
  ]);


  return (
    <>
      <div className="bg-[url('/image.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center relative overflow-hidden">
        {/* <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        /> */}

      <RouterProvider router={router} />

      </div>
    </>
  );
}

export default App;
