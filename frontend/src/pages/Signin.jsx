import React, { useEffect } from "react";

import { Label } from "../components/ui/lable";
import { Input } from "../components/ui/input";
import { cn } from "../components/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Signin() {
  useEffect(() => {
    setTimeout(() => {
      const signinWrapper = document.querySelector(".signinWrapper");
      signinWrapper.classList.add("popUp");
    }, 50);
  });
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center ">
        <div className="max-w-md w-full mx-auto flex justify-center rounded-2xl shadow-input signinWrapper relative overflow-hidden p-5">
          <div className="w-full  p-4 px-2 ">
            <div>
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Back!
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Locate the "Sign in" button on the website. Clicking on it will
                take you in home page.
              </p>
              <form className="my-8">
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
                    className="relative group/btn block bg-brand hover:bg-brand/80 w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                  >
                    Sign in &rarr;
                    <BottomGradient />
                  </button>
                </div>

                <div className="w-full flex-col space-y-4 py-5">
                  <div className="w-full h-[1px] bg-brand"></div>
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
                </div>
                <div className="mt-3">
                  <span className="text-black dark:text-neutral-300">
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

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
