import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA2sUUpcV9A5ndTj5n92tavO0aOWanjM0Y",
  authDomain: "chatapp-2dbc8-5b168.firebaseapp.com",
  projectId: "chatapp-2dbc8",
  storageBucket: "chatapp-2dbc8.appspot.com",
  messagingSenderId: "846820501412",
  appId: "1:846820501412:web:71b188caa14782c7ef4331",
  measurementId: "G-69NEYMNYTT",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
