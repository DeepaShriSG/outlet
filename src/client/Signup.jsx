import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ErrorPage from "../common/ErrorPage"

const Signup = () => {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    password: "",
    phonenumber: ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    
    try {
      const res = await axios.post("https://65780a67197926adf62f5bae.mockapi.io/users", formData);
      console.log(res.data);
       navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      <ErrorPage statusCode={error?.response?.status} message={error?.message} />
    } finally {
      setSubmit(false);
    }
  };

  const responseMessage = (response) => {
    console.log("Google Response:", response);
  };
  const errorMessage = (error) => {
    console.log("Google Error:", error);
  };

  return (
    <section className="p-2">
      <h2 className="text-center uppercase font-bold text-lg lg:text-xl text-black md:py-6">Signup</h2>
      <div className="flex justify-center items-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Create your Account</h2>
          <p className="text-gray-400 mb-6">
            Start your shopping in seconds. Already have an account?{" "}
            <span onClick={() => navigate('/login')} className="text-white hover:underline">Login here</span>
          </p>
         
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-1" htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-1" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Bonnie Green"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-1" htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Apt. 271"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-white text-sm mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 border text-white font-semibold rounded-lg transition"
              disabled={submit}
            >
              {submit ? "Submitting..." : "Sign up"}
            </button>
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
};

export default Signup;
