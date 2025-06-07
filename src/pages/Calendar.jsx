import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  { title: "Team Meeting", date: "2025-06-08T10:00:00" },
  { title: "Project Review", date: "2025-06-09T14:00:00" },
  { title: "Client Call", date: "2025-06-10T16:00:00" },
];

const Calendar = () => (
  <div className="w-full flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-6 mt-4 text-center">Calendar</h2>
    <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow p-4 sm:p-6 mb-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        height={600}
      />
    </div>
  </div>
);

export default Calendar;