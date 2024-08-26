
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// apiKey: import.meta.env.VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: "AIzaSyDyK3ng2xgig_1QEX2q-w5oNaDjJ8Il0s8",
  authDomain: "reactchat-5f2cd.firebaseapp.com",
  projectId: "reactchat-5f2cd",
  storageBucket: "reactchat-5f2cd.appspot.com",
  messagingSenderId: "935114569983",
  appId: "1:935114569983:web:276217129bb1ee1a58f4ca",
  measurementId: "G-5Q953RN1FL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

