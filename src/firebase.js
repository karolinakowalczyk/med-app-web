import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    query,
    collection,
    where,
    getDocs,
    addDoc,
    deleteDoc
} from 'firebase/firestore/lite'
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword
} from "firebase/auth"
import {
    AspectRatio,
    CoPresent
} from '@mui/icons-material'

const collections = {
    doctors: "doctors",
    patients: 'patients',
    appointments: 'appointments',
    prescriptions: 'prescriptions',
    categories: 'appointmentTypes'
}

const firebaseConfig = {
    apiKey: "AIzaSyCGWVpgsmRqRTdzEBVqKkAfGZIfYqayoK0",
    authDomain: "med-app-e3228.firebaseapp.com",
    projectId: "med-app-e3228",
    storageBucket: "med-app-e3228.appspot.com",
    messagingSenderId: "728472434992",
    appId: "1:728472434992:web:9aec69f20afa2f4864b0f5",
    measurementId: "G-KJBX68BYK5"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const auth = getAuth(app)

function signInEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        return userCredential.user
    }).catch((error) => {
        return {
            errorCode: error.code,
            errorMessage: error.message
        }
    })
}

function signInProvider(provider) {
    const providerObj = new provider()
    return signInWithPopup(auth, providerObj).then((result) => {
        return {
            user: result.user,
            credential: provider.credentialFromResult(result),
            accessToken: provider.credentialFromResult(result).accessToken
        }
    }).catch((error) => {
        return {
            errorCode: error.code,
            errorMessage: error.message,
            email: error.email,
            credential: provider.credentialFromError(error)
        }
    })
}

function signInGoogle() {
    return signInProvider(GoogleAuthProvider)
}

function signInFacebook() {
    return signInProvider(FacebookAuthProvider)
}

function logout() {
    return signOut(auth).then(() => {
        localStorage.clear()
        return true
    }).catch((error) => {
        return {
            errorCode: error.code,
            errorMessage: error.message
        }
    })
}

function signUpEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });
}

function registerDataSubmit(name, email, phone, uid, data) {
    setDoc(doc(db, collections.doctors, uid), {
        "name": name,
        "email": email,
        "phone": phone
    })
}

function getDocById(col, id) {
    return getDoc(doc(db, col, id)).then(result => {
        if (result.exists()) return result.data()
        else return undefined
    })
}

async function getByQuery(q) {
    return getDocs(q).then(snap => {
        let result = []
        snap.forEach((doc) => {
            result.push(doc.data())
        })
        return result
    })
}

function getUser(uid) {
    return getDocById(collections.doctors, uid)
}

function updateUser(uid, phone) {
    setDoc(doc(db, collections.doctors, uid), {
        "phone": phone
    }, {
        merge: true
    })
}

function getPatient(id) {
    return getDocById(collections.patients, id)
}

async function getAllPatients(uid, filter) {
    return await getDocs(collection(db, collections.patients)).then(async (snap) => {
        let arr = []
        let docdoc = []
        snap.forEach((docs) => {
            docdoc.push(docs)
        })
        for (const docs of docdoc) {
            let result = await getDocs(collection(db, collections.patients + '/' + docs.id + '/' + collections.appointments))
            let resres = []
            result.forEach((res) => {
                resres.push(res)
            })
            for (const elem of resres) {
                let apt = await getDoc(doc(db, collections.appointments + '/' + elem.data().date + '/' + collections.appointments, elem.data().id))
                if (apt.data().doctor == uid) {
                    let dat = docs.data()
                    dat['id'] = docs.id
                    arr.push(dat)
                }
            }
        }

        arr = Array.from(new Set(arr.map(a => a.id)))
            .map(id => {
                return arr.find(a => a.id === id)
            })

        console.log(arr)
        if (filter) {
            let result = []
            for (const patient of arr) {
                if (
                    (filter.name && patient.name.includes(filter.name)) &&
                    (filter.email && patient.email.includes(filter.email)) &&
                    (filter.phone && patient.phone.includes(filter.phone))) {
                    result.push(patient)
                    continue
                }
            }
            console.log(result)
            return result
        } else return arr
    })
}

function getAppointment(id) {
    return getDocById(collections.appointments, id)
}

function getUsersAppointmentsOnDay(uid, date) {
    const q = query(collection(db, collections.appointments + '/' + date + '/' + collections.appointments), where("doctor", '==', uid))
    return getByQuery(q)
}

function getFormattedDate(date) {
    return date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear()
}

async function getUsersAppointmentsBetween(uid, start, end) {
    let result = {}
    for (var d = start; d < end; d.setDate(d.getDate() + 1)) {

        let apps = await getUsersAppointmentsOnDay(uid, getFormattedDate(start))
        result[getFormattedDate(start)] = apps

    }
    return result
}

function addPrescription(patient, date, uid, medicines, done, number) {
    console.log(medicines)
    addDoc(collection(db, collections.patients + '/' + patient + '/' + collections.prescriptions), {
        "done": done,
        "date": date,
        "doctor": uid,
        "medicines": medicines,
        "number": number
    })
}

function getPrescriptions(patient, uid) {
    return getByQuery(
        query(
            collection(db, collections.patients + '/' + patient + '/' + collections.prescriptions),
            where('doctor', '==', uid)
        )
    )
}

function updatePrescription(patient, prescription, data) {
    setDoc(doc(db, collections.patients + '/' + patient + '/' + collections.prescriptions, prescription), data, {
        merge: true
    })
}

function getAppointmentCategories() {
    return getDocs(collection(db, collections.categories)).then(snap => {
        let result = []
        snap.forEach(q => result.push({
            id: q.id,
            name: q.data().name
        }))
        console.log(result)
        return result
    })
}

function getDoctorAppointmentCategories(uid) {
    return getDocs(collection(db, collections.doctors + '/' + uid + '/' + collections.categories)).then(snap => {
        let result = []
        snap.forEach(q => {
            let x = q.data()
            x.id = q.id
            result.push(x)
        }
            )
        //console.log(result)
        return result
    })
}

async function addDoctorAppointmentCategory(uid, eta, categoryID, price) {
    let category = await getDocById(collections.categories, categoryID)
    setDoc(doc(db, collections.doctors + '/' + uid + '/' + collections.categories, categoryID), {
        "estimatedTime": eta,
        //"id": categoryID,
        "name": category.name,
        "price": price
    })
}

async function removeDoctorAppointmentCategory(uid, categoryID) {
    console.log(categoryID)
    deleteDoc(doc(db, collections.doctors + '/' + uid + '/' + collections.categories, categoryID))
}

async function updateDoctorCategories(uid, categories){
    categories.forEach(element => {
        let category = getDocById(collections.categories, element.id).then(category => {
            console.log('DUPA')
        setDoc(doc(db, collections.doctors + '/' + uid + '/' + collections.categories, element.id), {
            "estimatedTime": element.estimatedTime,
            "name": category.name,
            "price": element.price
        }, {merge: true})
    })})    
}

function sortArrayBy(array, property) {
    return array.sort((a, b) => {
        if (a[property] < b[property]) return -1
        else if (a[property] > b[property]) return 1
        else return 0
    })
}


export {
    signInGoogle,
    signInEmail,
    logout,
    signUpEmail,
    registerDataSubmit,
    getUser,
    getPatient,
    getUsersAppointmentsOnDay,
    getUsersAppointmentsBetween,
    addPrescription,
    getPrescriptions,
    getAllPatients,
    updatePrescription,
    signInFacebook,
    getAppointmentCategories,
    getDoctorAppointmentCategories,
    addDoctorAppointmentCategory,
    removeDoctorAppointmentCategory,
    updateUser,
    sortArrayBy,
    updateDoctorCategories
}