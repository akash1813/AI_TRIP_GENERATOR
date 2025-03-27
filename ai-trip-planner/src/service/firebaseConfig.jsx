// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfJOvHN9vy5Q0XG8uJLhP1H5GhJ8HN5SA",
  authDomain: "ai-trip-planner-51fc7.firebaseapp.com",
  projectId: "ai-trip-planner-51fc7",
  storageBucket: "ai-trip-planner-51fc7.firebasestorage.app",
  messagingSenderId: "423297241262",
  appId: "1:423297241262:web:11e9f8434a94d6b2ce5d3f",
  measurementId: "G-W9NPEV0QV1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);