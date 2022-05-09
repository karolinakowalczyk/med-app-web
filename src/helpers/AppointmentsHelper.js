import {
    getUser,
    getPatient,
    getUsersAppointmentsOnDay,
    updatePrescription,
} from "../firebase";

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


export const INITIAL_EVENTS = [{
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
        end: todayStr + 'T13:30:00',
    }
]

export const getAppointments = async (date) => {
    //console.log(INITIAL_EVENTS)
    let initialAppointments = [];
    let userID = localStorage.getItem("userID");

    await getUsersAppointmentsOnDay(userID, date).then((result) => {
        //result.forEach((doc) => console.log(doc))

        result.forEach((doc) => {
            //console.log(doc.date.split("-").reverse().join("-") + "T" + doc.hour + ":00")
            initialAppointments.push({
                id: createEventId(),
                title: doc.title + ' ' + doc.patientName,
                start: doc.date.split("-").reverse().join("-") + "T" + doc.hour + ":00",
                patientId: doc.patient
                //end: todayStr + 'T01:00:00',
            })
        })
    });
    //console.log('init')
    //console.log(initialAppointments);
    return initialAppointments;
}

export function createEventId() {
    return String(eventGuid++)
}

export function getFormattedDate(date) {
    return date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear()
}