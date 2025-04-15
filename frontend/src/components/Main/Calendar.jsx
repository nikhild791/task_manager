import { useTasks } from "@/contexts/TaskContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const TaskCalendar = () => {
  const { tasks } = useTasks();
  const [tabs,setTabs] = useState(1)
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
  const [myEventsList,setMyEventList] = useState([])
   
  
  
  const handleSelectEvent = (event) => {
    navigate(`/main/tasks/${event.id}`)
  }
  
  useEffect(()=>{
    let x = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    })
    setMyEventList(x)
  },[tasks])



    
  const handleTab=(id)=>{
    let temp 
  switch (id) {
    case 1:
      temp = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    })
    setMyEventList(temp)
      break;
    case 2:
      temp = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    }).filter((t)=>{return t.status === 'WORKINPROGRESS'})
    setMyEventList(temp)
      break;
    case 3:
      temp = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    }).filter((t)=>{return t.status === 'COMPLETED'})
    setMyEventList(temp)
      break;
    case 4:
      temp = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    }).filter((t)=>{return t.status === 'PENDING'})
    setMyEventList(temp)
      break;
    case 5:
      console.log(tasks)
      temp = tasks.map((t)=>{
        return {
            id:t.id,
            title:t.title,
            start: new Date(t.dueDate),
            end : new Date(t.dueDate),
            status:t.status
        }
    }).filter((t)=>{return t.status === 'CANCELLED'})
    setMyEventList(temp)
      break;
    default:
      break;
  }
  setTabs(id)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Calendar</h1>
      </div>
      
      <div className="w-full mb-6">
        <div className="flex items-center justify-center gap-2 bg-white rounded-lg shadow-sm border p-1">
          <button
            onClick={() => handleTab(1)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              tabs === 1
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Tasks
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tabs === 1 ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.length}
            </span>
          </button>
          <button
            onClick={() => handleTab(2)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              tabs === 2
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tabs === 2 ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.filter(t => t.status === 'WORKINPROGRESS').length}
            </span>
          </button>
          <button
            onClick={() => handleTab(3)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              tabs === 3
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tabs === 3 ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.filter(t => t.status === 'COMPLETED').length}
            </span>
          </button>
          <button
            onClick={() => handleTab(4)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              tabs === 4
                ? 'bg-yellow-100 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pending
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tabs === 4 ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.filter(t => t.status === 'PENDING').length}
            </span>
          </button>
          <button
            onClick={() => handleTab(5)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              tabs === 5
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancelled
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tabs === 5 ? 'bg-red-200 text-red-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.filter(t => t.status === 'CANCELLED').length}
            </span>
          </button>
        </div>
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
          eventPropGetter={(event) => {
            let backgroundColor = ''
            let color = ''
            switch (event.status) {
              case 'COMPLETED':
                backgroundColor = '#b7eb8f' 
                color = 'green'
                break
              case 'CANCELLED':
                backgroundColor = '#ffa39e' 
                color = 'red'
                break
              case 'PENDING':
                backgroundColor = '#ffe58f'
                color = 'black'
                break
              case 'WORKINPROGRESS':
                backgroundColor = '#89CFF0'
                color = 'blue'
                break
              default:
                backgroundColor = '#d9d9d9'
                color = 'gray'
            }
            return {
              style: {
                backgroundColor,
                font: '24px',
                color,
                borderRadius: '4px',
                border: 'none',
                padding: '2px 5px',
              }
            }
          }}
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
