import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDxUgMSnKHk4GLaeuxZNAS4NcvNmMWudIA",
//     authDomain: "sasta-guitarhero-pro.firebaseapp.com",
//     projectId: "sasta-guitarhero-pro",
//     storageBucket: "sasta-guitarhero-pro.appspot.com",
//     messagingSenderId: "870998239840",
//     appId: "1:870998239840:web:21c6ce3485994320a13105"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCryif3mQhNQBX50maXcW7IhNf5tBAnuLw",
    authDomain: "neuro-crypt.firebaseapp.com",
    projectId: "neuro-crypt",
    storageBucket: "neuro-crypt.appspot.com",
    messagingSenderId: "656173641313",
    appId: "1:656173641313:web:dccf4964fb72228e2a8420"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
