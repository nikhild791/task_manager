import api from "./axios";

// Auth services
export const authService = {
  adminSignup: async (credentials) => {
    const response = await api.post('/admin/signup', credentials);
    return response.data;
  },
  
  adminSignin: async (credentials) => {
      const response = await api.post('/admin/signin', credentials);
      return response.data;
    },
   
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  userSignup: async () => {
    const response = await api.post('/user/signin');
    return response.data;
  },

  adminProfile: async () => {
    const response = await api.get('/admin');
    return response.data;
  },

};

export const taskService={
  allTask: async () => {
    const response = await api.get('/admin/task');
    return response.data;
  },
  addTask: async(data) =>{
    const res = await api.post('/admin/task',data)
    return res.data
  },
  allUser: async () =>{
    const response = await api.get('/admin/user')
    return response.data
  },
  createUser:async(data)=>{
    const response = await api.post('/admin/user',data)
    return response.data
  },
  deleteUser:async(id)=>{
    const res = await api.delete(`/admin/user/${id}`)
    return res.data
  },
  updateTask: async(data) =>{
    const res = await api.put('/admin/task',data)
    return res.data
  },
  deleteTask:async(data)=>{
    const res = await api.delete(`/admin/task/${data}`)
    return res.data
  }
}

export const userService={
  userSignin:async(credentials)=>{
    const response = await api.post('/user/signin',credentials)
    return response.data
  },
  userProfile:async()=>{
    const response = await api.get('/user')
    return response.data
  },
  showTask:async()=>{
    const response = await api.get('/user/task')
    return response.data
  }
}

