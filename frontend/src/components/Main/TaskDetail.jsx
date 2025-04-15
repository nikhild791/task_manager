import { useState,useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTasks } from "../../contexts/TaskContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import TaskForm from "../task/TaskForm";
import { Calendar, Edit, ArrowLeft, Check, XCircle } from "lucide-react";
import { format } from "date-fns";
import { taskService,userService } from "../../api/admin";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [users, setUsers] = useState([]);
  const { getTaskById, updateTask, deleteTask } = useTasks();
  const [adminName,setAdminName] = useState('')
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const task = getTaskById(parseInt(taskId) || "");
  useEffect(() => {
    const getAdmin = async()=>{
      if(!isAdmin){
        const xuseradmin = await userService.adminProfile()
        console.log(xuseradmin)
        setAdminName(xuseradmin.userAdmin.username)
      }else{
        setAdminName(currentUser)
      }
    }
    
  const getAllUsers = async () => {
    try {
      if (isAdmin) {
        const res = await taskService.allUser();
        if (res.success) {
          setUsers(res.users);
        }
      } else {
      
        setUsers([{ id: 0, username: currentUser }]);
      }
    } catch (err) {
      console.error('API Error:', err);
    }
  };
getAdmin()
    getAllUsers();
  }, [isAdmin,currentUser]); 

  const assignedUser = isAdmin 
    ? users.find(user => user.id === task?.userId)
    : { id: 0, username: currentUser };

  if (!task) {
    return (
      <div className="container mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Task Not Found</h1>
        <p className="mb-6">The task you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link onClick={()=>{navigate(-1)}}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const handleUpdateTask = async (formData) => {
    if (!currentUser || !task) return;
    setIsSubmitting(true);
    
    try {
      updateTask({
        title: formData.title,
        description: formData.description,
        userId: formData.userId,
        priority: formData.priority,
        level:formData.level,
        dueDate: formData.dueDate,
        taskId : task.id
      });
      
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteTask = (e) => {
    if (!currentUser || !task) return;
    let completedAt = null;
    if(e.target.value === 'COMPLETED'){
      completedAt = new Date()
   }
    setIsSubmitting(true);
    
    try {
      updateTask({
        title: task.title,
        description: task.description,
        userId: task.userId,
        priority: task.priority,
        level: task.level,
        dueDate: task.dueDate,
        completedAt,
        taskId : task.id,
        status:e.target.value
      });
      
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    navigate("/main/admin-dashboard");
  };

  const priorityColors = {
    LOW: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    MEDIUM: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    HIGH: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
  };

  const statusColors = {
    "PENDING": "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
    "WORKINPROGRESS": "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    "COMPLETED": "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    "CANCELLED": "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPP");
  };

  const initialFormValues = {
    title: task?.title || "",
    description: task?.description || "",
    assignedToId: task?.userId || "",
    priority: task?.priority || "MEDIUM",
    level: task?.level || "EASY",
    dueDate: task?.dueDate || ""
  };

  
  const isTaskNotCompleted = task.status !== "COMPLETED";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Button 
          className="text-muted-foreground hover:text-foreground transition-colors" 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          size="sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
      </div>
      
      <div className="bg-card rounded-xl border shadow-sm p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">{task.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`${priorityColors[task.priority]} px-3 py-1`}>
                {task.priority} priority
              </Badge>
              <Badge variant="outline" className={`${statusColors[task.status]} px-3 py-1`}>
                {task.status.replace("-", " ")}
              </Badge>
            </div>
          </div>
          
          {(isAdmin) && (
            <div className="flex gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {isTaskNotCompleted && (
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm 
                    onSubmit={handleUpdateTask} 
                    initialData={initialFormValues}
                    isSubmitting={isSubmitting} 
                  />
                </DialogContent>
              </Dialog>
              
              <Button variant="destructive" size="sm" onClick={handleDeleteTask} className="gap-2">
                <XCircle className="h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <label htmlFor="user-select" className="text-sm font-medium">Status</label>
            <select 
              id="user-select" 
              value={task.status} 
              onChange={handleCompleteTask}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              {['COMPLETED', 'WORKINPROGRESS', 'CANCELLED', 'PENDING'].map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Description</h2>
              <div className="bg-secondary/50 p-6 rounded-lg text-muted-foreground">
                {task.description}
              </div>
            </div>
            
            {task.status === 'COMPLETED' && (
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                <h3 className="text-sm font-medium text-emerald-800 mb-1">Completed</h3>
                <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground text-emerald-800" />
                <h3 className="text-sm font-medium text-emerald-800 mb-1">{formatDate(task.completedAt)}</h3>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Details</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=${assignedUser?.username || ''}`} 
                      alt={assignedUser?.username || 'User'} 
                    />
                    <AvatarFallback>{getInitials(assignedUser?.username || '')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{assignedUser?.username || 'Unassigned'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Assigned By</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${adminName}`} alt={adminName} />
                    <AvatarFallback>{getInitials(adminName)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{adminName}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatDate(task.dueDate)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm  font-medium text-muted-foreground">Created</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
