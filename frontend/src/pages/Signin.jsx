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
  signin,
  updateStatus,
} from "../redux/slices/authSlice";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

export default function Signin() {
  const [showOauthContainer, setShowOauthContainer] = useState(false);
  const [showSignInContainer, setShowSignInContainer] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState({
    isShow: false,
    message: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState({
    isShow: false,
    message: "",
  });
  const dispatch = useDispatch();
  const authInitialData = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [authInitialData.isLoggedIn]);

  useEffect(() => {
    if (authInitialData.isLoggedIn) {
      navigate("/");
    }
  }, [authInitialData.isLoggedIn]);

  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    if (authInitialData.status === "succeeded") {
      setShowSuccessAlert({
        isShow: true,
        message: "Signin successful. We'll redirect you to the home page.",
      });
      setTimeout(() => {
        setShowSuccessAlert({
          isShow: false,
          message: "",
        });
        navigate("/");
      }, 1000);
      dispatch(updateStatus("idle"));
    } else {
      if (authInitialData.status === "failed") {
        setShowErrorAlert({
          isShow: true,
          message: authInitialData.error,
        });
        setTimeout(() => {
          setShowErrorAlert({
            isShow: false,
            message: "",
          });
          if (authInitialData.error === "Verify your email.") {
            sessionStorage.setItem("fromRedirect", "true");
            navigate(`/verify-email?email=${userData.email}`);
          }
        }, 1000);
        dispatch(updateStatus("idle"));
      }
    }
  }, [authInitialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    setUserData({
      email: email.value,
      password: password.value,
    });
    dispatch(
      signin({
        email: email.value,
        password: password.value,
        ipAddress: ip,
        userAgent: navigator.userAgent,
      })
    );
  };

  const onClickOauth = () => {
    setShowOauthContainer(true);
    setShowSignInContainer(false);
  };

  const onClickBack = () => {
    setShowOauthContainer(false);
    setShowSignInContainer(true);
  };

  //This animation for signinWrapper

  useEffect(() => {
      setTimeout(() => {
        const signinWrapper = document.querySelector(".signinWrapper");
        signinWrapper.classList.add("popUp");
      }, 50);
  }, []);
  
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3">
        <div
          className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input signinWrapper relative overflow-hidden p-5"
          style={{
            height: showSignInContainer
              ? "30rem"
              : showOauthContainer
              ? "20rem"
              : "33rem",
          }}
        >
          <div
            className="w-full  p-4 px-2 bsolute transition ease-in-out delay-100 "
            style={{
              transform: showSignInContainer
                ? "translateX(0px)"
                : "translateX(-700px)",
            }}
          >
            <div>
              <h2 className="font-bold text-xl dark:text-green-700">
                Welcome to Back!
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Locate the "Sign in" button on the website. Clicking on it will
                take you in home page.
              </p>
              <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>

                <div className="mb-4">
                  <Link
                    to="/forget-password"
                    className="text-green-600 hover:underline font-semibold text-sm"
                  >
                    Forget password?
                  </Link>
                </div>

                <div className="flex flex-col gap-2 ">
                  <button
                    className="relative group/btn flex justify-center items-center  bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                  >
                    
                    {authInitialData.status == "loading" ? (
                      <>
                        <div class="loading"></div>
                      </>
                    ) : (
                      <>Sign in &rarr;</>
                    )}
                    <BottomGradient />
                  </button>

                  <button
                    className="relative group/btn  block bg-gray-400 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    onClick={onClickOauth}
                    type="button"
                  >
                    Sign in using OAuth &rarr;
                    <BottomGradient />
                  </button>
                </div>

                <div className="mt-3">
                  <span className="text-black dark:text-neutral-300 text-sm">
                    Need an account ?{" "}
                    <Link
                      to="/signup"
                      className="text-green-600 hover:underline font-semibold"
                    >
                      Sign up
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
            <h2 className="font-bold text-xl dark:text-green-700">
              Welcome to Back!
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              You'll be redirected to your chosen service's login page. Allow
              the app to access your account information.
            </p>

            <a
              href="/api/auth/github"
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 " />
              <span className="text-neutral-700 text-sm">GitHub</span>
              <BottomGradient />
            </a>
            <a
              href="/api/auth/google"
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
              type="submit"
            >
              <IconBrandGoogle
                className="h-4 w-4 text-neutral-800 "
                onClick={() => dispatch(signInOrSignUpWithGoogle)}
              />
              <span className="text-neutral-700 text-sm">Google</span>
              <BottomGradient />
            </a>
            <button
              className="relative group/btn bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium "
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
        <SuccessAlert
          showSuccessAlert={showSuccessAlert}
          setShowSuccessAlert={setShowSuccessAlert}
          message={showSuccessAlert.message}
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
