import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-8xl font-extrabold text-green-600">404</h1>
          <p className="text-2xl font-medium text-gray-300 mt-4">
            Oops! Page not found
          </p>
          <p className="text-md text-gray-400 mt-2">
            The page you’re looking for doesn’t exist.
          </p>
          <Link
            className="relative group/btn  flex select-none justify-center items-center mt-4 bg-gradient-to-br from-brand via-green-700 to-emerald-900 hover:from-brand/80 hover:via-green-700/80 hover:to-emerald-900/80 w-full text-white rounded-md h-10 font-medium"
           to="/"
          >
            Go to home page &rarr;
            <BottomGradient />
          </Link>
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
