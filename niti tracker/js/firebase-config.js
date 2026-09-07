import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkYfSnjqsEY9eOozQ42N7dCb0P6GJTPlQ",
  authDomain: "nititracker-5faec.firebaseapp.com",
  projectId: "nititracker-5faec",
  storageBucket: "nititracker-5faec.firebasestorage.app",
  messagingSenderId: "1039358894163",
  appId: "1:1039358894163:web:4f9dab955c4167b1bae6a6"
};

const app = initializeApp(firebaseConfig);

export { app };