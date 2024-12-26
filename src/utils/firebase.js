// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6U4fONbqN0Od2F4S_IJVqAkgp6odNTHI",
  authDomain: "netflixgpt-5a07c.firebaseapp.com",
  projectId: "netflixgpt-5a07c",
  storageBucket: "netflixgpt-5a07c.firebasestorage.app",
  messagingSenderId: "268792089148",
  appId: "1:268792089148:web:6727d39b1db0d05310d139",
  measurementId: "G-MP5NSKB9W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();