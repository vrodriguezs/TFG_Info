// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxB3OjTV1ko_dZBlJuj1PqvWGl-AY_uxs",
  authDomain: "automaticmenuapp.firebaseapp.com",
  projectId: "automaticmenuapp",
  storageBucket: "automaticmenuapp.appspot.com",
  messagingSenderId: "935445648387",
  appId: "1:935445648387:web:e5018eb62b8ab8f9f8aa36"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { firebase };