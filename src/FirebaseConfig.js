// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHrNmscNV19kfaReLwSM5vCJ-22O4JdpQ",
  authDomain: "final-exam-f1e76.firebaseapp.com",
  projectId: "final-exam-f1e76",
  storageBucket: "final-exam-f1e76.appspot.com",
  messagingSenderId: "263327236524",
  appId: "1:263327236524:web:c50d7ba49e28d86a80fa09",
  measurementId: "G-S5W7L5VSQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirestoreDatabase= getFirestore(app);