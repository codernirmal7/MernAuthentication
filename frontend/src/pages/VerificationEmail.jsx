import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import { updateStatus, verifyEmail } from "../redux/slices/authSlice";
import axios from "axios";

export default function VerificationEmail() {
  const [showSuccessAlert, setShowSuccessAlert] = useState({
    isShow: false,
    message: "",
  });
  const fromRedirect = sessionStorage.getItem("fromRedirect");

  const [inputBorder, setInputBorder] = useState("none");

  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ip, setIp] = useState("");

  useEffect(() => {
    if (!fromRedirect) {
      console.log("Direct access with email:", email);
      navigate("/");
    } else {
      sessionStorage.removeItem("fromRedirect");
    }
  }, []);

  const authInitialData = useSelector((state) => state.auth);

  const [showErrorAlert, setShowErrorAlert] = useState({
    isShow: false,
    message: "",
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIPAddress();
  }, []);

  useEffect(() => {
    if (authInitialData.status == "succeeded") {
      dispatch(updateStatus("idel"));
      setShowSuccessAlert({
        isShow: true,
        message:
          "Email Verified successful , We'll redirecting you in sign in.",
      });
      setTimeout(() => {
        setShowSuccessAlert({
          isShow: false,
          message: "",
        });
        navigate("/");
      }, 3000);
      setInputBorder("none");
    } else {
      if (authInitialData.status == "failed") {
        setInputBorder("red");
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

  function codeString() {
    let result = "";
    for (let i = 0; i < code.toString().length; i++) {
      if (i % 2 == 0) {
        result += code.toString()[i];
      }
    }
    return result;
  }

  function onCodeSubmit() {
    const arrayData = [
      {
        email: email,
      },
      {
        code: codeString(),
        ipAddress: ip,
      },
    ];
    dispatch(verifyEmail(arrayData));
  }

  const [resendEmailDelay, setResendEmailDelay] = useState(0);

  //this animation for verificationEmailWrapper
  useEffect(() => {
    setTimeout(() => {
      const verificationEmailWrapper = document.querySelector(
        ".verificationEmailWrapper"
      );
      verificationEmailWrapper.classList.add("popUp");
    }, 50);
  });

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus the next input
    if (element.nextSibling && element.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (paste.length != 6) {
      return;
    }
    const pasteArray = paste.split("").map((char) => (isNaN(char) ? "" : char));

    // Update the code state
    setCode(pasteArray);

    // Automatically fill inputs and focus the last filled input
    pasteArray.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;
      }
    });

    // Prevent any further manual input by removing focus
    inputRefs.current[pasteArray.length - 1]?.blur();
  };

  //this timer for resend email verification
  useEffect(() => {
    let interval;

    //check if resendEmailDelay is greater than 0
    if (resendEmailDelay > 0) {
      interval = setInterval(() => {
        setResendEmailDelay((prevState) => prevState - 1);
      }, 1000);
    }

    // if resendEmailDelay not greater than 0 then Cleanup function to clear interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendEmailDelay]);

  const onResendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "/api/auth/resend-verification-email",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowSuccessAlert({
        isShow: true,
        message: "A verification email has been sent to your email.",
      }),
        setResendEmailDelay(8);
      setTimeout(() => {
        setShowSuccessAlert({
          isShow: false,
          message: "",
        });
      }, 3000);
    } catch (error) {
      throw error.response.data.error;
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3">
        <div className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input verificationEmailWrapper relative overflow-hidden p-5">
          <div className="w-full  p-4 px-2 bsolute transition ease-in-out delay-100 ">
            <div>
              <div className="flex flex-col items-center justify-center gap-3">
                <svg
                  height="60px"
                  width="60px"
                  version="1.1"
                  id="_x32_"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                  className="fill-brand"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <style type="text/css"> </style>{" "}
                    <g>
                      {" "}
                      <path
                        class="st0"
                        d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <h1 className="text-3xl  font-bold dark:text-green-700">
                  Verify Your Email
                </h1>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Enter the 6-digit code sent to your email address.
                </p>
                <div className="flex space-x-3">
                  {code.map((data, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 rounded-md text-center text-black focus:outline-none"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onPaste={handlePaste}
                        style={{ border: `2px solid ${inputBorder}` }}
                      />
                    );
                  })}
                </div>
                <button
                  className="relative group/btn block bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full mt-4 text-white rounded-md h-10 font-medium"
                  type="submit"
                  onClick={onCodeSubmit}
                >
                  Verify email &rarr;
                  <BottomGradient />
                </button>

                <Link
                  to="/signup"
                  className="relative group/btn  flex items-center justify-center bg-gray-400 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                >
                  Back to signup &rarr;
                </Link>
                <BottomGradient />
              </div>

              <div className="mt-3">
                {resendEmailDelay == 0 ? (
                  <span
                    className="text-green-500 font-normal hover:underline cursor-pointer  text-sm"
                    onClick={onResendVerificationEmail}
                  >
                    Resend verification mail?
                  </span>
                ) : (
                  <span className="text-gray-400 font-normal cursor-pointer  text-sm">
                    Wait for {resendEmailDelay} second
                  </span>
                )}
              </div>
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
