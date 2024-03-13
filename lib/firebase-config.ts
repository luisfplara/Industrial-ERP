import { initializeApp, getApps, getApp  } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: 'AIzaSyC2HSA34Vpayk3gqq5VBUJTJk0JtxHozw8',
  authDomain: 'turbodev-c6c9c.firebaseapp.com',
  projectId: 'turbodev-c6c9c',
  storageBucket: 'turbodev-c6c9c.appspot.com',
  messagingSenderId: '596645095317',
  appId: '1:596645095317:web:01d1030dc902019d1e389c',
  measurementId: 'G-6J69VGMJTK'
}


  //console.log(firebaseConfig)

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db  = getFirestore(app);

export {auth, provider, db}