import { initializeApp, getApps, getApp  } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import  {getFirestore} from "firebase/firestore";
const firebaseConfig = JSON.parse(
  process.env.FIREBASE_SECRET_KEY as string
);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db  = getFirestore(app);

export {auth, provider, db}