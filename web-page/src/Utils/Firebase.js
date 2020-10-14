import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from '../env'

firebase.initializeApp(firebaseConfig);

// STATIC MODULES
export default firebase
export const firestore = firebase.firestore()
export const auth = firebase.auth();
export const firebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const AUTH = firebase.auth.Auth
