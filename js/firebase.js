// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBoO7_HaCFzzEjm8G_F5O4uYf2_9O-tnik",
  authDomain: "tele-bot-xinn.firebaseapp.com",
  databaseURL: "https://tele-bot-xinn-default-rtdb.firebaseio.com",
  projectId: "tele-bot-xinn",
  storageBucket: "tele-bot-xinn.firebasestorage.app",
  messagingSenderId: "223868480659",
  appId: "1:223868480659:web:e57ebf544d55f2c8873166",
  measurementId: "G-CPGFR2DY8S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
