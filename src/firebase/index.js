// import firebase from "../firebase";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase";
// import "firebase/firestore";
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
  appId: "1:843700946042:web:9ad9e434f5c6efdf05a7c3",
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

