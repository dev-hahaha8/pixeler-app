import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
     getAuth,
     Auth,
} from "firebase/auth";

const firebaseConfig = {
     apiKey: "AIzaSyBU1CqOPaIhtDwK9RQLOhC-GqRf5_u8vzc",
     authDomain: "next-firebase-app-2b9ec.firebaseapp.com",
     projectId: "next-firebase-app-2b9ec",
     storageBucket: "next-firebase-app-2b9ec.appspot.com",
     messagingSenderId: "534357570681",
     appId: "1:534357570681:web:c65637306729d9e15190a8"
};

let firebaseApp = FirebaseApp;
let auth = Auth;

if (typeof window !== "undefined" && !getApps().length) {
     firebaseApp = initializeApp(firebaseConfig);
     auth = getAuth();
}
export { firebaseApp, auth, };
