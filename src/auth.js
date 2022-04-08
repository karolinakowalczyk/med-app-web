import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth"

const auth = getAuth()

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

function signInFacebook(){
    return signInProvider(FacebookAuthProvider)
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