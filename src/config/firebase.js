import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmPvHFG1tNWMpPf95gFsvU01jF6odLnRc",
  authDomain: "whatsapp-clone-73f90.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-73f90.firebaseio.com",
  projectId: "whatsapp-clone-73f90",
  storageBucket: "whatsapp-clone-73f90.appspot.com",
  messagingSenderId: "796711821299",
  appId: "1:796711821299:web:1b60ac8cd768867662bc86",
  measurementId: "G-2K3WCVQ3N8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
