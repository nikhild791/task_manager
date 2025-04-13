import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import { authService } from "../api/admin";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { apiHelpers } from "../api/axios";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [navigate, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!credentials.username || !credentials.email || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (credentials.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Submitting signup form with data:", credentials);
      const res = await authService.adminSignup(credentials);
      console.log("Signup response:", res);

      if (res.success) {
        toast.success("Account created successfully! Please sign in.");
        navigate("/signin");
      } else {
        toast.error(res.msg || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg = apiHelpers.handleError(error);
      toast.error(`Signup failed: ${errorMsg.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-8 bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AnimatedSection delay={0.1}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              sign in to existing one
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    value={credentials.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    value={credentials.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="xyz@email.com"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={credentials.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="password@123"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Signup;
