// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK-HXMauowjBXmfM-ry3tePUDfNKBOAjw",
  authDomain: "test-452aa.firebaseapp.com",
  databaseURL: "https://test-452aa-default-rtdb.firebaseio.com",
  projectId: "test-452aa",
  storageBucket: "test-452aa.appspot.com",
  messagingSenderId: "894410328955",
  appId: "1:894410328955:web:49471747f86423a4194bde",
  measurementId: "G-7ZFR5TTN66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);