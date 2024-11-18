// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//will be unique for every project
const firebaseConfig = {
  apiKey: "AIzaSyBPQ3OEzTsKAh8v-hDVrP4RHtxJu4yd-Uo",
  authDomain: "secretsanta-2e7cf.firebaseapp.com",
  projectId: "secretsanta-2e7cf",
  storageBucket: "secretsanta-2e7cf.firebasestorage.app",
  messagingSenderId: "985554616284",
  appId: "1:985554616284:web:81913f9373e64e0f31d919",
  measurementId: "G-XRVE9JS45R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase services
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database

export { auth, db };