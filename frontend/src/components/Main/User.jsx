import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTasks } from "@/contexts/TaskContext";
import TaskCard from "../task/TaskCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus,  CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import UserForm from "../task/UserForm";
import { taskService } from "../../api/admin";

const User = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users,setUsers] = useState([{id:0,username:'all Users'}])
  const [userTask, setUserTask] = useState([])
  const { tasks } = useTasks();
  const getAllUsers = async()=>{
    let res =await taskService.allUser()
    res = [{id:0,username:'all Users'},...res.users]
    setUsers(res)
    
  }
  useEffect(()=>{
    setUserTask(tasks)
  },[tasks])
  useEffect(()=>{
    getAllUsers()
  },[])
  
 
  const handleCreateUser = async (formData) => {
    if (!currentUser) return;
  
    setIsSubmitting(true);
    
    try {
      const res = await taskService.createUser({username:formData.username})
      if(res.status){
        // setTasks(prevTasks => [...prevTasks, taskData]);
        toast.success("Task updated successfully");
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [selectedUser, setSelectedUser] = useState();

  const changeUser = (e) => {
    const value = parseInt(e.target.value);
    console.log('hi there',value)
    if(value ===0){
      setSelectedUser(0);
      setUserTask(tasks)
      return
    }
    setSelectedUser(value);
    const newTask = tasks.filter(task=>task.userId === value)
    setUserTask(newTask)
  };

  const handleDeleteUser=async(id)=>{
    if (!currentUser) return;
    if(!id){
      return ;
    }
    setIsSubmitting(true);
    try {
      const res = await taskService.deleteUser(id)
      if(res.success){
        toast.success("User deleted successfully");
        getAllUsers()
        setUserTask(tasks)
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  }


  const totalTasks = userTask.length;
  const completedTasks = userTask.filter(task => task.status === "COMPLETED").length;
  const pendingTasks = userTask.filter(task => task.status === "PENDING").length;
  const inProgressTasks = userTask.filter(task => task.status === "WORKINPROGRESS").length;
  const cancelledTasks = userTask.filter(task => task.status === "CANCELLED").length;  
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;


  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Dashboard</h1>
        <div>
      <label htmlFor="user-select">Select a user: </label>
      <select id="user-select" value={selectedUser?selectedUser:0} onChange={changeUser}>
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
                ))}
      </select> 
      <Button variant="destructive" size="sm" className='ml-4' onClick={()=>{handleDeleteUser(selectedUser)}}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Delete
                </Button>
    </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <UserForm onSubmit={handleCreateUser} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            {/* <User className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks + inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks} pending, {inProgressTasks} in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Total tasks completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledTasks}</div>
            <p className="text-xs text-muted-foreground">
              Total tasks cancelled
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="PENDING">Active</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {userTask.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No tasks created yet</p>
             
            </div>
          ) : (
            userTask.map((task) => (
              <TaskCard key={task.id}  task={task} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="PENDING" className="space-y-4">
          {userTask.filter(t => t.status !== "PENDING").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No active tasks</p>
            </div>
          ) : (
            userTask
              .filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS")
              .map((task) => (
                <TaskCard key={task.id}  task={task} />
              ))
          )}
        </TabsContent>
        
        <TabsContent value="COMPLETED" className="space-y-4">
          {userTask.filter(t => t.status === "COMPLETED").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            userTask
              .filter(t => t.status === "COMPLETED")
              .map((task) => (
                <TaskCard key={task.id}  task={task} />
              ))
          )}
        </TabsContent>
        <TabsContent value="CANCELLED" className="CANCELLED-y-4">
          {userTask.filter(t => t.status === "CANCELLED").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            userTask
              .filter(t => t.status === "CANCELLED")
              .map((task) => (
                <TaskCard key={task.id}  task={task} />
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default User;
