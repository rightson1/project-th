import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDOhqfpQcaTUQLv8tINATyKiahL4wsojJs",
    authDomain: "tomato-5a34c.firebaseapp.com",
    projectId: "tomato-5a34c",
    storageBucket: "tomato-5a34c.appspot.com",
    messagingSenderId: "856617441126",
    appId: "1:856617441126:web:8e5e6b6829f18fb6059aa7",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);