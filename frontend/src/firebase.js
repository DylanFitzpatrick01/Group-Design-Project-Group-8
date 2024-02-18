import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDAlrmNP4IydBXFKbj9ry7fZQmrswg1HKk",
  authDomain: "group-8---college-social-media.firebaseapp.com",
  projectId: "group-8---college-social-media",
  storageBucket: "group-8---college-social-media.appspot.com",
  messagingSenderId: "833481597283",
  appId: "1:833481597283:web:eeb23af113f6b5965bb356",
  measurementId: "G-CB5M15DR9W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);