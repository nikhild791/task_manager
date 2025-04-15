import { toast } from "react-toastify";
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
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, CheckCircle, Clock,XCircle, ArrowLeft, Copy  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserForm from "../task/UserForm";
import { taskService } from "../../api/admin";

const User = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([{ id: 0, username: "all Users" }]);
  const [userTask, setUserTask] = useState([]);
  const [newUserDetails, setNewUserDetails] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const { tasks } = useTasks();
  const getAllUsers = async () => {
    let res = await taskService.allUser();
    res = [{ id: 0, username: "all Users" }, ...res.users];
    setUsers(res);
  };
  useEffect(() => {
    setUserTask(tasks);
  }, [tasks]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleCreateUser = async (formData) => {
    if (!currentUser) return;
    setIsSubmitting(true);

    try {
      const res = await taskService.createUser({
        username: formData.username,
        email: formData.email,
      });

      if (res.success) {
        toast.success("User created successfully");
        setNewUserDetails(res.user);
        setShowCredentials(true);
        getAllUsers();
      } else {
        toast.error(res.msg || "Failed to create user");
      }
    } catch (error) {
      toast.error("Cannot create user internal server error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCredentialsDialog = () => {
    setShowCredentials(false);
    setIsDialogOpen(false);
    setNewUserDetails(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  const [selectedUser, setSelectedUser] = useState();

  const changeUser = (e) => {
    const value = parseInt(e.target.value);
    if (value === 0) {
      setSelectedUser(0);
      setUserTask(tasks);
      toast.info("all user successfully");
      return;
    }
    setSelectedUser(value);
    const newTask = tasks.filter((task) => task.userId === value);
    toast.info("User changed successfully");
    setUserTask(newTask);
  };

  const handleDeleteUser = async (id) => {
    if (!currentUser) return;
    if (!id) {
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await taskService.deleteUser(id);
      if (res.success) {
        toast.success("User deleted successfully");
        getAllUsers();
        setUserTask(tasks);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalTasks = userTask.length;
  const completedTasks = userTask.filter(
    (task) => task.status === "COMPLETED"
  ).length;
  const pendingTasks = userTask.filter(
    (task) => task.status === "PENDING"
  ).length;
  const inProgressTasks = userTask.filter(
    (task) => task.status === "WORKINPROGRESS"
  ).length;
  const cancelledTasks = userTask.filter(
    (task) => task.status === "CANCELLED"
  ).length;
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and track user tasks</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            className="gap-2"
            onClick={() => navigate(-1)}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-2">
          <select
            id="user-select"
            value={selectedUser ? selectedUser : 0}
            onChange={changeUser}
              className="px-3 py-2 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
              <option value="" disabled>Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
            
          <Button
            variant="destructive"
            size="sm"
              onClick={() => handleDeleteUser(selectedUser)}
              disabled={!selectedUser || selectedUser === 0}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Delete User
          </Button>
        </div>
          
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            {showCredentials && newUserDetails ? (
              <>
                <DialogHeader>
                  <DialogTitle>User Created Successfully</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <h3 className="font-medium text-lg mb-2 text-emerald-800">
                      User Credentials
                    </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-white rounded-md">
                        <span className="font-medium">Username:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{newUserDetails.username}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                              onClick={() => copyToClipboard(newUserDetails.username)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                        <div className="flex justify-between items-center p-2 bg-white rounded-md">
                        <span className="font-medium">Email:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{newUserDetails.email || "Not provided"}</span>
                          {newUserDetails.email && (
                            <Button
                              variant="ghost"
                              size="sm"
                                onClick={() => copyToClipboard(newUserDetails.email)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                        <div className="flex justify-between items-center p-2 bg-white rounded-md">
                        <span className="font-medium">Password:</span>
                          <div className="flex items-center gap-2">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {newUserDetails.password}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                              onClick={() => copyToClipboard(newUserDetails.password)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-red-600 mt-4">
                      Important: This is the only time you'll see this password.
                      Make sure to save it or share it with the user now.
                    </p>
                  </div>

                  <Button className="w-full" onClick={closeCredentialsDialog}>
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                  <UserForm onSubmit={handleCreateUser} isSubmitting={isSubmitting} />
              </>
            )}
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{completionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks + inProgressTasks}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                {pendingTasks} pending
              </span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {inProgressTasks} in progress
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <div className="p-2 bg-emerald-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                {completionRate}% success rate
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Tasks</CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledTasks}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                {cancelledTasks} cancelled
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-white p-1 rounded-lg border shadow-sm">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="PENDING"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="COMPLETED"
            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger 
            value="CANCELLED"
            className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {userTask.length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No tasks created yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTask.map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="PENDING" className="space-y-4">
          {userTask.filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No active tasks</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTask
                .filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS")
                .map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="COMPLETED" className="space-y-4">
          {userTask.filter(t => t.status === "COMPLETED").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTask
                .filter(t => t.status === "COMPLETED")
                .map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="CANCELLED" className="space-y-4">
          {userTask.filter(t => t.status === "CANCELLED").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No cancelled tasks</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTask
                .filter(t => t.status === "CANCELLED")
                .map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default User;
