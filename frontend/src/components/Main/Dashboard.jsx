import { useTasks } from "@/contexts/TaskContext";
import TaskCard from "../task/TaskCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, User, CheckCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTasks();
  
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter(task => task.status === "PENDING").length;
  const inProgressTasks = tasks.filter(task => task.status === "WORKINPROGRESS").length;
  const cancelledTasks = tasks.filter(task => task.status === "CANCELLED").length;  
  
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
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
            <User className="h-4 w-4 text-muted-foreground" />
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
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No tasks created yet</p>
             
                Ask your admin to assign task
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="PENDING" className="space-y-4">
          {tasks.filter(t => t.status !== "PENDING").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No active tasks</p>
            </div>
          ) : (
            tasks
              .filter(t => t.status === "PENDING" || t.status === "WORKINPROGRESS")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
          )}
        </TabsContent>
        
        <TabsContent value="COMPLETED" className="space-y-4">
          {tasks.filter(t => t.status === "COMPLETED").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            tasks
              .filter(t => t.status === "COMPLETED")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
          )}
        </TabsContent>
        <TabsContent value="CANCELLED" className="CANCELLED-y-4">
          {tasks.filter(t => t.status === "CANCELLED").length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="text-lg text-muted-foreground">No completed tasks yet</p>
            </div>
          ) : (
            tasks
              .filter(t => t.status === "CANCELLED")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
