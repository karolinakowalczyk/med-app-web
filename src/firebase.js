import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"

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

function signInProvider(provider){
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

function signInGoogle(){
    return signInProvider(GoogleAuthProvider)
}

function logout() {
    return signOut(auth).then(() => {
        return true
    }). catch((error) => {
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

export { signInGoogle, signInEmail, logout, signUpEmail}