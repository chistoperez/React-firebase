import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBxXACBJY72eEOAi2TSTExyPzrRRn5t5AE",
  authDomain: "react-cpp.firebaseapp.com",
  projectId: "react-cpp",
  storageBucket: "react-cpp.appspot.com",
  messagingSenderId: "154518416854",
  appId: "1:154518416854:web:731648d493b5d0101c0877",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
