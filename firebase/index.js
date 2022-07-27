import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "super secret don't tell",
  authDomain: "firestore-tutoral-the-first.firebaseapp.com",
  databaseURL: "https://firestore-tutoral-the-first.firebaseio.com",
  projectId: "firestore-tutoral-the-first",
  storageBucket: "firestore-tutoral-the-first.appspot.com",
  messagingSenderId: "super secret don't tell",
  appId: "super secret don't tell",
  measurementId: "super secret don't tell"
});


let db = firebase.firestore()


export default {
  firebase, db
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcrvKlz9xNrPaqoCpeaFvrj-s21bCcoaQ",
  authDomain: "contacts-611c7.firebaseapp.com",
  projectId: "contacts-611c7",
  storageBucket: "contacts-611c7.appspot.com",
  messagingSenderId: "843700946042",
  appId: "1:843700946042:web:9ad9e434f5c6efdf05a7c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);