// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO4gQM7x4JOKajWR9B13_HJq3xy2S-6-k",
  authDomain: "chatapp-6bced.firebaseapp.com",
  projectId: "chatapp-6bced",
  storageBucket: "chatapp-6bced.appspot.com",
  messagingSenderId: "792733947997",
  appId: "1:792733947997:web:247908d92061fc805695b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); 