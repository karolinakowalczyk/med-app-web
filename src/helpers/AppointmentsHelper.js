import {
    getUser,
    getPatient,
    getUsersAppointmentsOnDay,
    updatePrescription,
} from "../firebase";

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const date = new Date()

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

function getFormattedDate(){
    return date.getDate().toString().padStart(2, '0')+'-'+(date.getMonth()+1).toString().padStart(2, '0')+'-'+date.getFullYear()
}

export const getAppointments = async () => {
    //console.log(INITIAL_EVENTS)
    let initialAppointments = [];
    let userID = localStorage.getItem("userID");
    // console.log(userID);
    // getUser(userID).then(result => console.log(result))
    //console.log(userID)
    //console.log(getFormattedDate())
    await getUsersAppointmentsOnDay(userID, getFormattedDate()).then((result) => {
        console.log("ccc")
        result.forEach((doc) => console.log(doc))

        result.forEach((doc) => {
            console.log(doc.date.split("-").reverse().join("-") + "T" + doc.hour + ":00")
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