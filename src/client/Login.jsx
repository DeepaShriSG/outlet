import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {toast} from "react-toastify"
import ErrorPage from "../common/ErrorPage";

function Login() {
  const [submit, setSubmit] = useState(false);
  let [email, setemail] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  const handleLogin = async () => {
    setSubmit(true);
    try {
      const res = await AxiosService.post("/user/login", {
        email: email,
        password: password,
        role:"user"
      });
      if (res.status == "200") {
        console.log("Login Success");  
        toast.success("Login Success")
        sessionStorage.setItem("token",res.data.token)
        navigate("/shopnow");
      }
    } catch (error) {
      console.log(error);

      <ErrorPage statusCode={error?.response?.status} message={error?.message} />;
    } finally {
      setSubmit(false);
      setemail("");
      setPassword("");
    }
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <section className="p-2 m-3 flex flex-col items-center">
      <h2 className="text-center uppercase font-bold text-lg lg:text-xl text-black py-6 md:py-8 px-6">Login</h2>
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setemail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block mb-2 flex text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <span
                className="absolute top-10 inline-block
              right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash"}></i>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
              <a href="#" className="text-sm font-medium text-white hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white border border-slate-300 hover:border-slate-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled={submit}
              onClick={() => handleLogin()}>
              {submit ? "Submitting..." : "Sign in"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <span onClick={() => navigate("/signup")} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                Sign up
              </span>
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="w-full border-t border-gray-600"></div>
              <span className="text-gray-400">or</span>
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
