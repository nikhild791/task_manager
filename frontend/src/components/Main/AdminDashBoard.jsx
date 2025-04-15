import { useState } from "react";
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
import TaskForm from "../task/TaskForm";
import { Plus, User, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth();
  const { tasks, addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter(task => task.status === "PENDING").length;
  const inProgressTasks = tasks.filter(task => task.status === "WORKINPROGRESS").length;
  const cancelledTasks = tasks.filter(task => task.status === "CANCELLED").length;  
  
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = async (formData) => {
    if (!currentUser) return;
  
    setIsSubmitting(true);
    
    try {
     
      addTask({
        title: formData.title,
        description: formData.description,
        userId: formData.userId,
        priority: formData.priority,
        level:formData.level,
        dueDate: formData.dueDate,
        status:'PENDING'
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and track all tasks</p>
        </div>
        
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign New Task</DialogTitle>
              </DialogHeader>
              <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />
            </DialogContent>
          </Dialog>
          <Button 
            onClick={() => navigate('user')}
            variant="outline"
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Users Point
          </Button>
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
              <User className="h-4 w-4 text-yellow-600" />
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
              <CheckCircle className="h-4 w-4 text-red-600" />
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
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No tasks created yet</p>
              <Button 
                variant="link" 
                onClick={() => setIsDialogOpen(true)}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Create your first task
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="PENDING" className="space-y-4">
          {tasks.filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No active tasks</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks
                .filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="COMPLETED" className="space-y-4">
          {tasks.filter(t => t.status === "COMPLETED").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks
                .filter(t => t.status === "COMPLETED")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="CANCELLED" className="space-y-4">
          {tasks.filter(t => t.status === "CANCELLED").length === 0 ? (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border">
              <p className="text-lg text-muted-foreground">No cancelled tasks</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks
                .filter(t => t.status === "CANCELLED")
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
