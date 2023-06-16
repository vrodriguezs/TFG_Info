import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAxB3OjTV1ko_dZBlJuj1PqvWGl-AY_uxs",
  authDomain: "automaticmenuapp.firebaseapp.com",
  projectId: "automaticmenuapp",
  storageBucket: "automaticmenuapp.appspot.com",
  messagingSenderId: "935445648387",
  appId: "1:935445648387:web:e5018eb62b8ab8f9f8aa36"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

export { firebase };