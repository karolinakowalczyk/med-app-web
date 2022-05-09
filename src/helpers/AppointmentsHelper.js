import {
    getUsersAppointmentsBetween
} from "../firebase";

let eventGuid = 0

export const getAppointments = async (userID, dateStart, dateEnd) => {

    let initialAppointments = [];
    let start = new Date(dateStart);
    let end = new Date(dateEnd);

    let result = await getUsersAppointmentsBetween(userID, dateStart, dateEnd);

    for (var d = start; d < end; d.setDate(d.getDate() + 1)) {
        let arr = result[getFormattedDate(d)]
        arr.forEach((doc) => {
            initialAppointments.push({
                id: createEventId(),
                title: doc.title + ' ' + doc.patientName,
                start: doc.date.split("-").reverse().join("-") + "T" + doc.hour + ":00",
                end: doc.date.split("-").reverse().join("-") + "T" + doc.endHour + ":00",
                patientId: doc.patient
            })
        })

    }
    return initialAppointments;
}

export function createEventId() {
    return String(eventGuid++)
}

export function getFormattedDate(date) {
    return date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear()
}