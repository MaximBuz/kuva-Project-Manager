import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, collection, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZ6hpzz8VCI6TD59suHbWqzlEQ1B7nRiU",
    authDomain: "kanban-app-7dbc8.firebaseapp.com",
    projectId: "kanban-app-7dbc8",
    storageBucket: "kanban-app-7dbc8.appspot.com",
    messagingSenderId: "1091681956404",
    appId: "1:1091681956404:web:560879729a6101f4161061",
    measurementId: "G-XP8BPMQSS4"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' });
  const db = getFirestore(app);

  export {auth, provider, db, signInWithPopup}