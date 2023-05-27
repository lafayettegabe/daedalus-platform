// Import the functions you need from the SDKs you need
// firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMXbUkPlbj34eObXZMRWrRyNr5dLFIaAQ",
  authDomain: "daedalus-server-386819.firebaseapp.com",
  projectId: "daedalus-server-386819",
  storageBucket: "daedalus-server-386819.appspot.com",
  messagingSenderId: "476882360314",
  appId: "1:476882360314:web:50ce5b46f2d87292c5b643",
  measurementId: "G-JY71VQLFRK"
};

let analytics;



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }