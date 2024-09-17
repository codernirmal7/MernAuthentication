import React, { useEffect, useState } from "react";

import { Label } from "../components/ui/lable";
import { Input } from "../components/ui/input";
import { cn } from "../components/lib/utils";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, updateStatus } from "../redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [showSuccessAlert, setShowSuccessAlert] = useState({
    isShow: false,
    message: "",
  });
  const [showErrorAlert, setShowErrorAlert] = useState({
    isShow: false,
    message: "",
  });
  const authInitialData = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const {token} = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (authInitialData.status == "succeeded") {
      setShowSuccessAlert({
        isShow: true,
        message:
          "Password reset successful.",
      }),
        setTimeout(() => {
          setShowSuccessAlert({
            isShow: false,
            message: "",
          });
          navigate("/signin")
        }, 3000);
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
          }, 3000);
         dispatch(updateStatus("idel"));

      }
    }
  }, [authInitialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password , confirmPassword} = e.target;
    dispatch(resetPassword({password : password.value , confirmPassword : confirmPassword.value, resetPasswordToken : token}))
  };

  //this animation for resetPasswordWrapper
  useEffect(() => {
    setTimeout(() => {
      const resetPasswordWrapper = document.querySelector(
        ".resetPasswordWrapper"
      );
      resetPasswordWrapper.classList.add("popUp");
    }, 50);
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3">
        <div className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input resetPasswordWrapper relative overflow-hidden p-5">
          <div className="w-full  p-4 px-2 bsolute transition ease-in-out delay-100 ">
            <div>
              <h2 className="font-bold text-3xl text-green-600 text-center">
                Reset password
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center dark:text-neutral-300">
                Locate the "Sign in" button on the website. Clicking on it will
                take you in home page.
              </p>
              <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input id="confirmPassword" type="password" />
                </LabelInputContainer>

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    className="relative group/btn flex justify-center items-center  bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                   
                  >
                     {authInitialData.status == "loading" ? (
                      <>
                        <div className="loading"></div>
                      </>
                    ) : (
                      <>Change password &rarr;</>
                    )}
                    <BottomGradient />
                  </button>
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
