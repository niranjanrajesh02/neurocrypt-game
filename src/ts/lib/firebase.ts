import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCryif3mQhNQBX50maXcW7IhNf5tBAnuLw",
  authDomain: "neuro-crypt.firebaseapp.com",
  projectId: "neuro-crypt",
  storageBucket: "neuro-crypt.appspot.com",
  messagingSenderId: "656173641313",
  appId: "1:656173641313:web:dccf4964fb72228e2a8420",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(
  app,
  "https://neuro-crypt-default-rtdb.asia-southeast1.firebasedatabase.app",
);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export default app;
