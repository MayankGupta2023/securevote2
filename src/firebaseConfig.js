// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWA2IA7OKnjSwtC78zA32DEB5ikS9fp5c",
    authDomain: "vote-a7e97.firebaseapp.com",
    projectId: "vote-a7e97",
    storageBucket: "vote-a7e97.appspot.com",
    messagingSenderId: "20525560746",
    appId: "1:20525560746:web:9b6be50875854a2cbdb1d3",
    measurementId: "G-SPLSXDMJBE",
    databaseURL: "https://vote-a7e97-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);