import { useAuth } from "@/contexts/AuthContext";
import { useTasks } from "@/contexts/TaskContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
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
import { Plus, User, CheckCircle, Clock } from "lucide-react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { useNavigate } from "react-router-dom";

const TaskCalendar = () => {
  const { tasks } = useTasks();
  const locales = {
    'en-US': enUS,
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  const navigate = useNavigate('')
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter(task => task.status === "PENDING").length;
  const inProgressTasks = tasks.filter(task => task.status === "WORKINPROGRESS").length;
  const cancelledTasks = tasks.filter(task => task.status === "CANCELLED").length;  
  
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const handleSelectEvent = (event) => {
    navigate(`/main/tasks/${event.id}`)
  }
  
  const myEventsList = 
    tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate)
        }
    })
    
  
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Calendar</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={['month', 'week', 'day']}
          defaultView="month"
          className="rbc-calendar"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '4px',
              border: 'none',
              padding: '2px 5px',
            },
          })}
          dayPropGetter={(date) => ({
            className: 'rbc-day-slot',
            style: {
              backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? '#f8fafc' : 'white',
            },
          })}
          components={{
            toolbar: (props) => (
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => props.onNavigate('PREV')}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-semibold">{props.label}</h2>
                  <button
                    onClick={() => props.onNavigate('NEXT')}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => props.onNavigate('TODAY')}
                    className="px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => props.onView('month')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      props.view === 'month' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => props.onView('week')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      props.view === 'week' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => props.onView('day')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      props.view === 'day' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Day
                  </button>
                </div>
              </div>
            ),
          }}
          formats={{
            monthHeaderFormat: (date, culture, localizer) =>
              localizer.format(date, 'MMMM yyyy', culture),
            dayHeaderFormat: (date, culture, localizer) =>
              localizer.format(date, 'EEEE dd', culture),
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
              `${localizer.format(start, 'MMMM dd', culture)} – ${localizer.format(
                end,
                'MMMM dd',
                culture
              )}`,
          }}
        />
      </div>
    </div>
  );
};

export default TaskCalendar;
