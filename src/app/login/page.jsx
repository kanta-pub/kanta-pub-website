"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // If the field is the email, validate it
    if (name === 'email') {
      setIsEmailValid(emailRegex.test(value)); // Update isEmailValid based on regex match
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show toast for invalid email
    if (!isEmailValid) {
      toast.error("Please enter a valid email address."); // Show error toast
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res.error) {
        toast.error("Invalid credentials. Please try again.");
        // console.log("Invalid Credentials");
        throw new Error("Invalid Credentials");
      } else {
        toast.success("User signed in successfully.");
        // console.log("User signed in");
        router.refresh('/');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      toast.error("An error occurred: " + error.message); // Show error toast
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-full items-center flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-200 px-6 pt-5 pb-7 rounded-[12px]"
        style={{
            boxShadow:'0 0 4px 4px rgba(0,0,0,0.10)'
        }}>
           <div className="text-center mb-8">
          <img
            src="/LoginLogo.png" // Replace with your actual image path
            alt="Admin Login"
            className="mx-auto w-24 h-24"
          />
          <h1 className="text-xl font-semibold text-indigo-600 mt-4">
            Admin Login
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Only administrators are allowed to log in. Please proceed with your credentials.
          </p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-indigo-600">
                Email:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  placeholder="Write here Email..."
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-indigo-600">
                  Password:
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Write here password..."
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <IoEyeSharp className="text-2xl" />
                  ) : (
                    <FaEyeSlash className="text-2xl" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  isLoading || !isEmailValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                }`}
                disabled={isLoading || !isEmailValid}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;   