import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
  withCredentials: false,
});

// Request interceptor - add token and handle errors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    // For debugging - log all requests
    console.log(
      `API Request: ${config.method.toUpperCase()} ${config.url}`,
      config.data || ""
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle auth errors and other common issues
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Get the original request
    const originalRequest = error.config;

    // Log the full error
    console.error("API Error:", {
      url: originalRequest?.url,
      method: originalRequest?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // // Handle auth errors
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   // Only redirect to login if not already trying to login
    //   if (!originalRequest.url?.includes("/signin")) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("role");

    //     // Use window location for SPA navigation to login
    //     window.location.href = "/signin";
    //   }
    // }

    // Handle server errors
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    // Network errors
    if (error.code === "ECONNABORTED" || !error.response) {
      console.error("Network error, please check your connection");
    }

    return Promise.reject(error);
  }
);

// Helper methods for common API operations
export const apiHelpers = {
  handleError: (error) => {
    const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return { success: false, message };
  },
};

export default api;
