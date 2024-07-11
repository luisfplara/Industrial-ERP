import { initializeApp, getApps, getApp  } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore";
const firebaseConfig =JSON.parse(
  process.env.FIREBASE_CLIENT_SECRET as string
);  
console.log(firebaseConfig)

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestoreInstance  = getFirestore(app);

export {auth, provider, firestoreInstance}