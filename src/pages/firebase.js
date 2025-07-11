// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-pYbBbXZwBtRMvzdv0qj5Eh7LGbiRPi4",
  authDomain: "literwertung.firebaseapp.com",
  databaseURL: "https://literwertung-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "literwertung",
  storageBucket: "literwertung.firebasestorage.app",
  messagingSenderId: "477094677262",
  appId: "1:4770946772 62:web:c126a2d83698d6bd77a55f",
  measurementId: "G-8GH36XGVSD"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);