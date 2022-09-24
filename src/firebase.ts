// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7KbF_weoI73obY5__6Jk0w_jVUaZOsH8",
  authDomain: "chat-app-4a684.firebaseapp.com",
  projectId: "chat-app-4a684",
  storageBucket: "chat-app-4a684.appspot.com",
  messagingSenderId: "456483435242",
  appId: "1:456483435242:web:052756066a06a8af961d93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
