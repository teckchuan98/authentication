// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcuydfNYAKaVcsacFtsJQckXcOxMJ1Zr8",
  authDomain: "auction-app-2204.firebaseapp.com",
  projectId: "auction-app-2204",
  storageBucket: "auction-app-2204.appspot.com",
  messagingSenderId: "1016472186682",
  appId: "1:1016472186682:web:d3cf0c235e42e6b54eaa03",
  measurementId: "G-WH6TZE1Z00"
};


// what does this do lol 
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

// const auth = firebase.auth();
const auth = firebase.auth();

export {auth, firebaseConfig};