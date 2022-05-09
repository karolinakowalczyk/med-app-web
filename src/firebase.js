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
    addDoc
} from 'firebase/firestore/lite'
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    signInWithPopup,
    createUserWithEmailAndPassword
} from "firebase/auth"
import {
    CoPresent
} from '@mui/icons-material'

const collections = {
    doctors: "doctors",
    patients: 'patients',
    appointments: 'appointments',
    prescriptions: 'prescriptions'
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

function getPatient(id) {
    return getDocById(collections.patients, id)
}

function getAllPatients(uid) {
    return getDocs(collection(db, collections.patients)).then((snap) => {
        let arr = []
        snap.forEach((docs) => {
            getDocs(collection(db, collections.patients + '/' + docs.id + '/' + collections.appointments)).then(result => {
                result.forEach(elem => {
                    getDoc(doc(db, collections.appointments + '/' + elem.data().date + '/' + collections.appointments, elem.data().id)).then(apt => {
                        if (apt.data().doctor == uid) {
                            arr.push(docs.data())
                        }
                    })
                })
            })
        })
        return arr
    })
}

function getAppointment(id) {
    return getDocById(collections.appointments, id)
}

function getUsersAppointmentsOnDay(uid, date) {
    const q = query(collection(db, collections.appointments + '/' + date + '/' + collections.appointments), where("doctor", '==', uid))
    return getByQuery(q)
}

function addPrescription(patient, date, uid, medicines, done) {
    addDoc(collection(db, collections.patients + '/' + patient + '/' + collections.prescriptions), {
        "done": done,
        "date": date,
        "doctor": uid,
        "medicines": medicines
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

export {
    signInGoogle,
    signInEmail,
    logout,
    signUpEmail,
    registerDataSubmit,
    getUser,
    getPatient,
    getUsersAppointmentsOnDay,
    addPrescription,
    getPrescriptions,
    getAllPatients,
    updatePrescription
}