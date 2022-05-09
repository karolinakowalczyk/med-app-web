import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../helpers/AppointmentsHelper";

const Calendar = () => {
  const weekendsVisible = true;
  const [initialAppointments, setInitialAppointments] = useState([]);
  const navigate = useNavigate();

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b> {eventInfo.timeText} </b> <i> {eventInfo.event.title} </i>{" "}
      </div>
    );
  };
  const handleEventClick = (clickInfo) => {
    navigate(`/patient-details/${clickInfo.event.extendedProps.patientId}`, {
      id: clickInfo.event.extendedProps.patientId,
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        datesSet={(arg) => {
          let userID = localStorage.getItem("userID");
          getAppointments(userID, arg.start, arg.end).then((appointments) =>
            setInitialAppointments(appointments)
          );
        }}
        initialView="timeGridDay"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        events={initialAppointments}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
