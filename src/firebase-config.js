import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn-xlzCV4WR2zXzYNsKvG9Q5Vby0AkRZM",
  authDomain: "mission-audition.firebaseapp.com",
  projectId: "mission-audition",
  storageBucket: "mission-audition.appspot.com",
  messagingSenderId: "188390528292",
  appId: "1:188390528292:web:46d39c67e037c5dd47cfb1",
  measurementId: "G-QDX8FWVLN2",
};

const db = getFirestore(initializeApp(firebaseConfig));
const apiKey = firebaseConfig.apiKey;
const storage = getStorage();

export { storage, db, apiKey };
