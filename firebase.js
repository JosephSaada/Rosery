// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import {getFirestore, FirestoreSettings, connectFirestoreEmulator} from 'firebase/firestore';   
import firebase from 'firebase/app' 
import { firestore } from '@firebase/firestore';  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 

const firebaseConfig = { 
  apiKey: "AIzaSyC3ANbN7iRVeRJfV7RX0IcEgfLQZizg1Uo",  
  //apiKey: "AIzaSyD7JYwOt7bZG_9A41qBJgXh9m_ksmf6-XU",  
  authDomain: "gamo-7dec8.firebaseapp.com",
  projectId: "gamo-7dec8",
  storageBucket: "gamo-7dec8.appspot.com",
  messagingSenderId: "710721300209",
  appId: "1:710721300209:web:0ac5011bea5ea68a3f6b50",
  measurementId: "G-TY8FY6BS1R"
};

// Initialize Firebase 
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 

const db = getFirestore(app, {   
  experimentalForceLongPolling: true, 
  //experimentalAutoDetectLongPolling: true,
  //useFetchStreams: false, 
});   

//connectFirestoreEmulator(db, 'localhost', 8080);

//port number 9099 auth 
//port number functions 5001 
//port number firestore emulator 8080 
//port number database 9000 
//port number hosting 5000 
//pubsub 8085 
//storage 9199

export { auth, db }