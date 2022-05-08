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

export const getAppointments = async () => {
    //console.log(INITIAL_EVENTS)
    let initialAppointments = [];
    let userID = localStorage.getItem("userID");
    // console.log(userID);
    //getUser(userID).then(result => console.log(result))
    await getUsersAppointmentsOnDay("akRU3kHoRLdpqXh3TGCDcDoVuMw1", "08-05-2022").then((result) => {
        console.log("ccc")
        result.forEach((doc) => console.log(doc))
        result.forEach((doc) => {
            initialAppointments.push({
                id: createEventId(),
                title: 'haah',
                start: todayStr + 'T12:00:00',
                end: todayStr + 'T13:30:00',
            })
        })
    });
    console.log('init')
    console.log(initialAppointments);
    return initialAppointments;
}

export function createEventId() {
    return String(eventGuid++)
}