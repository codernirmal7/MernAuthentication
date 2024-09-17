import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoggedIn, getUserData, signOut, updateStatus } from "../redux/slices/authSlice";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const authInitialData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkIsLoggedIn())
  }, [])
  

  useEffect(() => {
    if (authInitialData.isLoggedIn) {
      dispatch(getUserData());
    } else {
      navigate("/signin");
    }
  }, [authInitialData.isLoggedIn]);

  useEffect(() => {
    if(authInitialData.isLoggedIn){
      setTimeout(() => {
        const homeWrapper = document.querySelector(".homeWrapper");
        homeWrapper.classList.add("popUp");
      }, 50);
    }
   
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3 ">
        <div className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input homeWrapper relative overflow-hidden p-5">
          <div className="w-full  p-4 px-2 transition ease-in-out delay-100 ">
            <div>
              <h2 className="font-bold text-3xl dark:text-green-700 text-center">
                Account Details
              </h2>
              <div className="mt-5 p-4 border flex flex-col gap-2 border-gray-600 rounded-lg bg-black/10">
                <h2 className="text-lg font-semibold text-green-500">
                  Profile Information
                </h2>
                <div>
                  <ul>
                    <li className="text-gray-300">
                      Name : {authInitialData.data?.name}
                    </li>
                    <li className="text-gray-300">
                      Email : {authInitialData.data?.email}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 p-4 border flex flex-col gap-2 border-gray-600 rounded-lg bg-black/10">
                <h2 className="text-lg font-semibold text-green-500">
                  Recent Activity
                </h2>
                <div>
                  <ul>
                    <li className="text-gray-300">
                      Last Login : {authInitialData.data?.lastTimeLogin}
                    </li>
                    <li className="text-gray-300">
                      Account created at :{" "}
                      {authInitialData.data?.accountCreatedAt}
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="relative group/btn block mt-5  bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium"
                type="button"
                onClick={() => {
                  dispatch(signOut());
                  navigate("/signin");
                }}
              >
                Sign out &rarr;
                <BottomGradient />
              </button>
            </div>
          </div>
        </div>
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
