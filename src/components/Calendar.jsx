import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import {
  createEventId,
  getAppointments,
  getFormattedDate,
} from "../helpers/AppointmentsHelper";

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialAppointments, setInitialAppointments] = useState([]);
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [patient, setPatient] = useState

  /*const handleClose = () => {
    setOpen(false);
  };*/

  /*useEffect(() => {
    const loadAppointments = async () => {
      let appointments = await getAppointments();
      setInitialAppointments(appointments);
    };
    loadAppointments();
  }, []);*/

  const handleDateSelect = (selectInfo) => {
    console.log("add appointment");
    //add to database
    //setOpen(true);
    //let title = prompt("Please enter a new title for your event");
    /*let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }*/
  };
  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b> {eventInfo.timeText} </b> <i> {eventInfo.event.title} </i>{" "}
      </div>
    );
  };
  const handleEventClick = (clickInfo) => {
    console.log("event selected");
    console.log(clickInfo.event.extendedProps.patientId);
    navigate(`/patient-details/${clickInfo.event.extendedProps.patientId}`, {
      id: clickInfo.event.extendedProps.patientId,
    });
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
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
          //console.log("******");
          //console.log(arg);
          //arg includes data about current visible dates
          //console.log(arg.start); //starting visible date
          //console.log(arg.end); //ending visible date
          let date = getFormattedDate(arg.start);
          //console.log(date);
          getAppointments(date).then((appointments) =>
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
        //select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after appointments are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />{" "}
    </div>
  );
};

export default Calendar;
