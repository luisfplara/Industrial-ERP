import { initializeApp, getApps, getApp  } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAajbckN86uioXVxZ4jDizWs-gybbIv9B8",
  authDomain: "polvilho-tres-coqueiros-erp.firebaseapp.com",
  projectId: "polvilho-tres-coqueiros-erp",
  storageBucket: "polvilho-tres-coqueiros-erp.appspot.com",
  messagingSenderId: "711465347696",
  appId: "1:711465347696:web:cd16b4f2d237f97ed562b5",
  measurementId: "G-Z1QJ96RC6C"
}
  //console.log(firebaseConfig)

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestoreInstance  = getFirestore(app);

export {auth, provider, firestoreInstance}