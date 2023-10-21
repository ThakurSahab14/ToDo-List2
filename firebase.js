// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const obj = {
 apiKey: process.env.FIREBASE_KEY,
  authDomain: "project1-e3076.firebaseapp.com",
  projectId: "project1-e3076",
  storageBucket: "project1-e3076.appspot.com",
  messagingSenderId: "975647213205",
  appId: "1:975647213205:web:bb59d87176cef440543d9c",
  measurementId: "G-VN53EWBNTV"
};
// firebase.initializeApp(firebaseConfig, 'myCustomAppName');
export const app = initializeApp(obj);
export const auth = getAuth(app);
// export const storage = getStorage(App);
export const db = getFirestore(app);
