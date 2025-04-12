import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar,  Check } from "lucide-react";

const TaskCard = ({ task, onComplete }) => {
  const priorityColors = {
    LOW: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700",
    MEDIUM: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700",
    HIGH: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700"
  };

  const statusColors = {
    "PENDIG": "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
    "WORKINPROGRESS": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700",
    "COMPLETED": "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700",
    "CANCELLED": "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700"
  };

 

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <Link 
          to={`/main/tasks/${task.id}`} 
          className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {task.title}
        </Link>
        <div className="flex space-x-2">
         
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
          <Badge variant="outline" className={statusColors[task.status]}>
            {task.status.replace("-", " ")}
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Due: {(task.dueDate)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task} alt={task.userId} />
            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">
              {getInitials(task.title)} 
            </AvatarFallback>
          </Avatar>
          
          {task.status !== "COMPLETED" && onComplete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onComplete(task.id)}
              className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
