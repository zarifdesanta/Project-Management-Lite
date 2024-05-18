// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUH5SbOvbAIc-SiRG6efh6xt5vQpzFeuU",
  authDomain: "project-management-lite.firebaseapp.com",
  projectId: "project-management-lite",
  storageBucket: "project-management-lite.appspot.com",
  messagingSenderId: "1029841227584",
  appId: "1:1029841227584:web:63a6103c7d507d6f3db4a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
