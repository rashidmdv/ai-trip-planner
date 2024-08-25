// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsnNX_NW1tQ1F2kmBuEDGAwJgFTkRuz1w",
  authDomain: "ai-travel-plannerr.firebaseapp.com",
  projectId: "ai-travel-plannerr",
  storageBucket: "ai-travel-plannerr.appspot.com",
  messagingSenderId: "1002119574551",
  appId: "1:1002119574551:web:1d0ba3f16b5085d6e0d852",
  measurementId: "G-NXFNJJC2VN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);