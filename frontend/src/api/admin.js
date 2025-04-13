import api, { apiHelpers } from "./axios";

// Auth services
export const authService = {
  adminSignup: async (credentials) => {
    try {
      const response = await api.post("/admin/signup", credentials);
      return response.data;
    } catch (error) {
      console.error("Signup API error:", error);
      return apiHelpers.handleError(error);
    }
  },

  adminSignin: async (credentials) => {
    try {
      const response = await api.post("/admin/signin", credentials);
      return response.data;
    } catch (error) {
      console.error("Signin API error:", error);
      return apiHelpers.handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  },

  userSignup: async (credentials) => {
    try {
      const response = await api.post("/user/signin", credentials);
      return response.data;
    } catch (error) {
      console.error("User signup API error:", error);
      return apiHelpers.handleError(error);
    }
  },

  adminProfile: async () => {
    try {
      const response = await api.get("/admin");
      return response.data;
    } catch (error) {
      console.error("Admin profile API error:", error);
      return apiHelpers.handleError(error);
    }
  },

  getInitialMessage: async (data) => {
    try {
      const res = await api.get(`/admin/message/${data}`);
      return res.data;
    } catch (error) {
      console.error("Get messages API error:", error);
      return apiHelpers.handleError(error);
    }
  },
};

export const taskService = {
  allTask: async () => {
    try {
      const response = await api.get("/admin/task");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return apiHelpers.handleError(error);
    }
  },
  addTask: async (data) => {
    try {
      const res = await api.post("/admin/task", data);
      return res.data;
    } catch (error) {
      console.error("Error adding task:", error);
      return apiHelpers.handleError(error);
    }
  },
  allUser: async () => {
    try {
      const response = await api.get("/admin/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return apiHelpers.handleError(error);
    }
  },
  createUser: async (data) => {
    try {
      const response = await api.post("/admin/user", data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      return apiHelpers.handleError(error);
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await api.delete(`/admin/user/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return apiHelpers.handleError(error);
    }
  },
  updateTask: async (data) => {
    const res = await api.put("/admin/task", data);
    return res.data;
  },
  deleteTask: async (data) => {
    const res = await api.delete(`/admin/task/${data}`);
    return res.data;
  },
};

export const userService = {
  userSignin: async (credentials) => {
    const response = await api.post("/user/signin", credentials);
    return response.data;
  },
  changePassword: async (credentials) => {
    const response = await api.put("/user/change-password", credentials);
    return response.data;
  },
  userProfile: async () => {
    const response = await api.get("/user");
    return response.data;
  },
  updateTask: async (data) => {
    const res = await api.put("/user/task", data);
    return res.data;
  },
  showTask: async () => {
    const response = await api.get("/user/task");
    return response.data;
  },
  getInitialMessage: async (data) => {
    const res = await api.get(`/user/message/${data}`);
    return res.data;
  },
};
