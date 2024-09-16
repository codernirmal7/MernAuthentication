"use client";
import React, { useEffect, useState } from "react";

import { Label } from "../components/ui/lable";
import { Input } from "../components/ui/input";
import { cn } from "../components/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIsLoggedIn,
  signup,
  updateStatus,
} from "../redux/slices/authSlice";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authInitialData = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showErrorAlert, setShowErrorAlert] = useState({
    isShow: false,
    message: "",
  });
  useEffect(() => {
    if (authInitialData.isLoggedIn) {
      navigate("/");
    }
  }, [authInitialData.isLoggedIn]);
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [authInitialData.isLoggedIn]);

  useEffect(() => {
    if (authInitialData.status == "succeeded") {
      sessionStorage.setItem("fromRedirect", true);
      navigate(`/verify-email?email=${userData.email}`);
      dispatch(updateStatus("idel"));
    } else {
      if (authInitialData.status == "failed") {
        setShowErrorAlert({
          isShow: true,
          message: authInitialData.error,
        }),
          setTimeout(() => {
            setShowErrorAlert({
              isShow: false,
              message: "",
            });
          }, 1000);
        dispatch(updateStatus("idel"));
      }
    }
  }, [authInitialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    setUserData({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    dispatch(
      signup({
        name: name.value,
        email: email.value,
        password: password.value,
      })
    );
  };

  const [showOauthContainer, setShowOauthContainer] = useState(false);
  const [showSignUpContainer, setShowSignUpContainer] = useState(true);

  const onClickOauth = () => {
    setShowOauthContainer(true);
    setShowSignUpContainer(false);
  };

  const onClickBack = () => {
    setShowOauthContainer(false);
    setShowSignUpContainer(true);
  };

  //this animation for signupWrapper
  useEffect(() => {
    setTimeout(() => {
      const signupWrapper = document.querySelector(".signupWrapper");
      signupWrapper.classList.add("popUp");
    }, 50);
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3">
        <div
          className="max-w-md w-full mx-auto transition ease-in-out delay-300 flex justify-center rounded-2xl shadow-input signupWrapper relative overflow-hidden p-5"
          style={{
            height: showSignUpContainer
              ? "35rem"
              : showOauthContainer
              ? "25rem"
              : "33rem",
          }}
        >
          <div
            className="w-full  p-4 px-6 absolute transition ease-in-out delay-100 signupContainer"
            style={{
              transform: showSignUpContainer
                ? "translateX(0px)"
                : "translateX(-700px)",
            }}
          >
            <div>
              <h2 className="font-bold text-xl dark:text-green-700">
                Welcome to Mern Auth
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Locate the "Sign Up" button on the website. Clicking on it will
                take you in Email verification page.
              </p>
              <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Tyler Ern" type="text" />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>

                <div className="flex flex-col gap-2 ">
                  <button
                    className="relative group/btn flex justify-center items-center bg-gradient-to-br from-brand via-green-700  hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 to-emerald-900 w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                  >
                    {authInitialData.status == "loading" ? (
                      <>
                        <div class="loading">Loading...</div>
                      </>
                    ) : (
                      <>Sign up &rarr;</>
                    )}
                    <BottomGradient />
                  </button>

                  <button
                    className="relative group/btn  block bg-gray-400 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    onClick={onClickOauth}
                    type="button"
                  >
                    Sign up using OAuth &rarr;
                    <BottomGradient />
                  </button>
                </div>
                <div className="mt-3">
                  <span className="text-black dark:text-neutral-300 text-sm">
                    Already Have an account ?{" "}
                    <Link
                      to="/signin"
                      className="text-green-600 hover:underline font-semibold"
                    >
                      Sign in
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div
            className="w-full flex-col px-6 space-y-4 p-4 absolute transition ease-in-out delay-100 oauthContainer"
            style={{
              transform: showOauthContainer
                ? "translateX(0px)"
                : "translateX(700px)",
            }}
          >
            <h2 className="font-bold text-xl  dark:text-green-700">
              Welcome to Mern Auth
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              You'll be redirected to your chosen service's login page. Allow
              the app to access your account information.
            </p>

            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 " />
              <span className="text-neutral-700 text-sm">GitHub</span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 " />
              <span className="text-neutral-700 text-sm">Google</span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 "
              type="submit"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 " />
              <span className="text-neutral-700 text-sm">OnlyFans</span>
              <BottomGradient />
            </button>

            <button
              className="relative group/btn  bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium "
              onClick={onClickBack}
            >
              Back &rarr;
              <BottomGradient />
            </button>
          </div>
        </div>
        <ErrorAlert
          showErrorAlert={showErrorAlert}
          setShowSuccessAlert={setShowErrorAlert}
          message={showErrorAlert.message}
        />
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
