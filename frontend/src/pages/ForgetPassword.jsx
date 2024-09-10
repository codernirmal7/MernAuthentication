import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { cn } from "../components/lib/utils";
import { Link } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert";

export default function ForgetPassword() {
    const [showSuccessAlert, setShowSuccessAlert] = useState({
        isShow: false,
        message: "",
      });
    

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };


  //this animation for forgetPasswordWrapper
  useEffect(() => {
    setTimeout(() => {
      const forgetPasswordWrapper = document.querySelector(".forgetPasswordWrapper");
      forgetPasswordWrapper.classList.add("popUp");
    }, 50);
  });
  
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3 ">
        <div
          className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input forgetPasswordWrapper relative overflow-hidden p-5"
          
        >
          <div
            className="w-full  p-4 px-2 bsolute transition ease-in-out delay-100 "
           
          >
            <div>
              <h2 className="font-bold text-3xl dark:text-green-700 text-center">
                Forget password
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center dark:text-neutral-300">
                Enter your email address and we will send you a link to reset
                your password.
              </p>
              <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                  />
                </LabelInputContainer>

                <div className="flex flex-col gap-2 ">
                  <button
                    className="relative group/btn block  bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                    onClick={() => {
                        setShowSuccessAlert({
                          isShow: true,
                          message:
                            "Please check your mail inbox for a password reset link that we’ve sent to codernirmal@gmail.com.",
                        }),
                        setTimeout(() => {
                          setShowSuccessAlert({
                            isShow: false,
                            message: "",
                          });
                        }, 3000);
                      }}
                  >
                    Send &rarr;
                    <BottomGradient />
                  </button>

                  <Link
                    className="relative group/btn  flex items-center justify-center bg-gray-400 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="button"
                    to="/signin"
                  >
                    &larr; Back to login
                    <BottomGradient />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
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
