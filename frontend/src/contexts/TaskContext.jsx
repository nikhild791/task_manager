import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { taskService, userService } from "../api/admin";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { currentUser, role } = useAuth();
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    
      const getAllTask = async () => {
        if (!role) return; 
        
        try {
          let res;
          if (role === 'admin') {
            res = await taskService.allTask(); 
          } else if (role === 'user') {
            res = await userService.showTask(); 
          } else {
            console.warn('No valid role found.');
            return;
          }
    
          if (res.success) {
            setTasks(res.tasks);
          }
        } catch (err) {
          console.error('API Error:', err);
        }
      };
    if (role && currentUser) {
      getAllTask();
    }
  }, [role, currentUser]);

  const addTask = async (taskData) => {
    if (!currentUser) return;
    const res = await taskService.addTask(taskData)
    if(res.success){
      setTasks(prevTasks => [...prevTasks, res.task]);
      toast.success("Task added successfully");
    }
  };

  const updateTask =async (data) => {
    let res 
    if(role === 'admin'){
      res = await taskService.updateTask(data)
    }else{
      res = await userService.updateTask(data)
    }
    if(res.success){
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === data.taskId ? { ...task, ...data } : task
        )
      );
      toast.success("Task updated successfully");
    }
  };


  const completeTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              status: "COMPLETED",
              completedAt: new Date().toISOString()
            } 
          : task
      )
    );
    toast.success("Task completed! Achievement unlocked!");
  };

  const deleteTask =async (id) => {
    const res = await taskService.deleteTask(id)
    if(res.success){
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success("Task deleted successfully");
    }
  };

  const getTaskById = (id) => {
   tasks.map((task)=>{
    console.log(task.id === id,id,task.id)
   })
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
        tasks,
        updateTask,
        completeTask,
        deleteTask,
        getTaskById
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
