import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CALENDAR_KEY = 'dashgenie_calendar_events';
const defaultEvents = [
  { title: "Team Meeting", date: "2025-06-08T10:00:00" },
  { title: "Project Review", date: "2025-06-09T14:00:00" },
  { title: "Client Call", date: "2025-06-10T16:00:00" },
];

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(CALENDAR_KEY);
    return saved ? JSON.parse(saved) : defaultEvents;
  });
  const calendarRef = useRef();

  useEffect(() => {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(events));
  }, [events]);

  const handleDateClick = (info) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  const handleEventClick = (info) => {
    if (window.confirm(`Delete event '${info.event.title}'?`)) {
      setEvents(events.filter(e => !(e.title === info.event.title && e.date === info.event.startStr)));
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 mt-4 text-center">Calendar</h2>
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6 mb-8">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height={600}
        />
      </div>
    </div>
  );
};

export default Calendar;